const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  chapterTitle: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  questionText: { type: String, required: true },
  options: {
    type: [String],
    validate: [arr => arr.length === 4, 'Each MCQ must have exactly 4 options.']
  },
  correctOptionIndex: { type: Number, required: true, min: 0, max: 3 },
  explanation: { type: String, required: true },
  pageReference: { type: Number, default: 1 },
  isSavedForReview: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
