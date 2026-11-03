const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  chapterTitle: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Mixed'], default: 'Mixed' },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  timeSpentSeconds: { type: Number, default: 0 },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    questionText: String,
    selectedOptionIndex: Number,
    correctOptionIndex: Number,
    isCorrect: Boolean
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizAttempt', QuizAttemptSchema);
