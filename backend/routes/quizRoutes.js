const express = require('express');
const QuizAttempt = require('../models/QuizAttempt');
const router = express.Router();

// 8. POST /api/quizzes/attempts — Save quiz results
router.post('/attempts', async (req, res) => {
  try {
    const { userId, documentId, chapterTitle, difficulty, score, totalQuestions, timeSpentSeconds, answers } = req.body;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const attempt = await QuizAttempt.create({
      userId: userId || '663000000000000000000001',
      documentId,
      chapterTitle,
      difficulty,
      score,
      totalQuestions,
      percentage,
      timeSpentSeconds,
      answers
    });
    res.status(201).json(attempt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
