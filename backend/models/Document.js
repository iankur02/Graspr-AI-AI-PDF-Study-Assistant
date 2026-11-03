const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  chapterNumber: { type: Number, required: true },
  title: { type: String, required: true },
  pageStart: { type: Number, required: true },
  pageEnd: { type: Number, required: true },
  content: { type: String, required: true }
});

const PageChunkSchema = new mongoose.Schema({
  pageNumber: { type: Number, required: true },
  chunkIndex: { type: Number, required: true },
  text: { type: String, required: true }
});

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  folder: { type: String, default: 'General Study' },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number, required: true },
  pageCount: { type: Number, default: 1 },
  extractedText: { type: String, required: true },
  chapters: [ChapterSchema],
  chunks: [PageChunkSchema],
  lastStudiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);
