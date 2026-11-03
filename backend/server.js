require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const documentRoutes = require('./routes/documentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Register Core REST API Endpoints
app.use('/api/documents', documentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_pdf_study_assistant';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`AI PDF Study Assistant API running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
