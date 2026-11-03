const express = require('express');
const Document = require('../models/Document');
const Summary = require('../models/Summary');
const QuizAttempt = require('../models/QuizAttempt');
const Conversation = require('../models/Conversation');
const router = express.Router();

// 9. GET /api/history — Retrieve study history & dashboard stats
router.get('/', async (req, res) => {
  try {
    const [documents, summaries, quizAttempts, conversations] = await Promise.all([
      Document.find().select('title folder pageCount lastStudiedAt createdAt').sort({ lastStudiedAt: -1 }),
      Summary.find().sort({ createdAt: -1 }).limit(20),
      QuizAttempt.find().sort({ createdAt: -1 }).limit(30),
      Conversation.find().sort({ updatedAt: -1 }).limit(15)
    ]);

    const averageQuizScore = quizAttempts.length
      ? Math.round(quizAttempts.reduce((acc, a) => acc + a.percentage, 0) / quizAttempts.length)
      : 0;

    res.json({
      stats: {
        totalDocuments: documents.length,
        totalSummaries: summaries.length,
        totalQuizzes: quizAttempts.length,
        averageQuizScore
      },
      documents,
      summaries,
      quizAttempts,
      conversations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
