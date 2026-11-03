const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  chapterTitle: { type: String, required: true },
  pageRange: { type: String, default: '' },
  overview: { type: String, required: true },
  keyConcepts: [{ type: String }],
  definitions: [{
    term: { type: String, required: true },
    definition: { type: String, required: true }
  }],
  revisionNotes: [{ type: String }],
  teacherTip: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Summary', SummarySchema);
