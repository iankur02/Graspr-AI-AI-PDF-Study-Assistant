const express = require('express');
const multer = require('multer');
const Document = require('../models/Document');
const Summary = require('../models/Summary');
const Question = require('../models/Question');
const Conversation = require('../models/Conversation');
const { extractAndStructurePDF } = require('../services/pdfService');
const { retrieveRelevantChunks } = require('../services/ragService');
const { generateChapterSummary, generateChapterMCQs, generateGroundedAnswer } = require('../services/aiService');

const router = express.Router();

// Configure Multer for PDF validation and memory/disk handling
const upload = multer({
  limits: { fileSize: (Number(process.env.MAX_FILE_SIZE_MB) || 25) * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only valid PDF files are allowed.'));
  }
});

// 1. POST /api/documents/upload — Upload PDF & Extract Text
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No PDF file uploaded.' });
    const parsed = await extractAndStructurePDF(req.file.buffer);
    const doc = await Document.create({
      userId: req.body.userId || '663000000000000000000001',
      title: req.body.title || req.file.originalname.replace(/\.pdf$/i, ''),
      folder: req.body.folder || 'General Study',
      fileUrl: `/uploads/${Date.now()}_${req.file.originalname}`,
      fileSize: req.file.size,
      pageCount: parsed.pageCount,
      extractedText: parsed.extractedText,
      chapters: parsed.chapters,
      chunks: parsed.chunks
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET /api/documents — List user's PDFs
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find().select('-extractedText -chunks').sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET /api/documents/:id — Get document details
router.get('/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    doc.lastStudiedAt = new Date();
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. POST /api/documents/:id/summarize — Generate chapter summary
router.post('/:id/summarize', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    const { chapterTitle } = req.body;
    const chapter = doc.chapters.find(c => c.title === chapterTitle) || doc.chapters[0];
    const generated = await generateChapterSummary(chapter.title, chapter.content);
    const saved = await Summary.create({
      userId: doc.userId,
      documentId: doc._id,
      chapterTitle: chapter.title,
      pageRange: `Pages ${chapter.pageStart}–${chapter.pageEnd}`,
      ...generated
    });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. POST /api/documents/:id/generate-quiz — Generate MCQs
router.post('/:id/generate-quiz', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    const { chapterTitle, difficulty = 'Medium', count = 5 } = req.body;
    const chapter = doc.chapters.find(c => c.title === chapterTitle) || doc.chapters[0];
    const mcqs = await generateChapterMCQs(chapter.title, chapter.content, difficulty, count);
    const savedQuestions = await Question.insertMany(
      mcqs.map(q => ({
        userId: doc.userId,
        documentId: doc._id,
        chapterTitle: chapter.title,
        difficulty,
        ...q
      }))
    );
    res.json(savedQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. POST /api/documents/:id/chat — Ask questions (RAG)
router.post('/:id/chat', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    const { question } = req.body;
    const relevantChunks = retrieveRelevantChunks(doc.chunks, question, 3);
    const response = await generateGroundedAnswer(question, relevantChunks);

    let convo = await Conversation.findOne({ documentId: doc._id });
    if (!convo) {
      convo = await Conversation.create({
        userId: doc.userId,
        documentId: doc._id,
        title: doc.title,
        messages: []
      });
    }
    convo.messages.push({ role: 'user', content: question, citations: [] });
    convo.messages.push({ role: 'assistant', content: response.answer, citations: response.citations });
    convo.updatedAt = new Date();
    await convo.save();

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. GET /api/documents/:id/questions — Retrieve saved questions
router.get('/:id/questions', async (req, res) => {
  try {
    const questions = await Question.find({ documentId: req.params.id }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
