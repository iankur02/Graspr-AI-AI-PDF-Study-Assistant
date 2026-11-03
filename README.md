AI PDF Study Assistant (Graspr AI)
An Intelligent, Document-Grounded Learning Platform for Personalized Academic Revision
AI PDF Study Assistant (Graspr AI) is a full-stack MERN + Retrieval-Augmented Generation (RAG) web application designed to help university students, competitive exam aspirants, and researchers transform static academic PDFs into interactive study workspaces. Upload textbooks, lecture notes, or research papers to automatically extract structured chapters, generate concise revision summaries, practice difficulty-graded multiple-choice quizzes, flip 3D flashcards, listen to conversational AI audio overviews, and chat directly with your notes using verified page citations.
Why AI PDF Study Assistant?
Students routinely spend hours sifting through dense textbooks and lecture PDFs to extract definitions, build revision notes, and test their understanding before exams. Generic AI chatbots often hallucinate facts outside the syllabus or lose track of page context.
Graspr AI solves this by grounding every summary, multiple-choice question, flashcard, and chat answer strictly inside the user's uploaded PDF documents—attaching clickable [Page X] citations and abstaining when a query falls outside the uploaded material.
Core Features
1. Three-Pane Interactive Document Workspace
Course Folder & Document Library (Left Pane): Organize uploaded PDFs by course code (e.g., CHAM 1802, CS 301, CS 405), filter documents instantly, and switch between study sessions.
Multi-Source Academic Viewer (Center Pane): Read extracted textbook chapters with zoom controls, page indicators, and source tabs for PDF Document, YouTube Lecture Transcript, and Audio Lecture Notes.
Floating AI Selection Context Menu: Highlight any sentence or formula inside the PDF viewer to trigger 7 instant actions:
Explain: Breaks down complex passages or equations in plain language.
Summarize: Condenses the highlighted excerpt into bulleted key points.
Flashcard: Converts the selection into an active-recall front/back flashcard.
Chat: Quotes the selected passage directly into the RAG chat input.
Add to Notes: Saves the highlight with its page number and tag (Formula, Concept, Exam Tip) to your study notepad.
Create Hyperlink: Copies a formatted academic citation anchor ([Document — Chapter, Page X]).
What The Teacher Says: Surfaces high-yield exam traps and professor insights for that topic.
2. Chapter-Wise AI Summaries
Automatically detects chapter headings and section boundaries (with page-range fallback for unstructured PDFs).
Generates structured revision material per chapter:
Executive Chapter Overview
Extracted Key Concepts
Important Definitions Glossary
High-Yield Revision Bullet Points
What The Teacher Says (Exam Alert Box)
Supports one-click regeneration and saving to permanent study history.
3. AI MCQ Generator & Interactive Quiz Engine
Generates 4-option multiple-choice questions strictly grounded in the selected chapter.
Supports difficulty filtering (Easy, Medium, Hard, and All Difficulties).
Provides instant option validation, verified explanations with exact page references, live score calculation, and persistent attempt logging.
4. Grounded RAG Chat with Uploaded Notes
Splits extracted PDF text into overlapping, page-indexed chunks for top-k retrieval.
Answers natural-language questions using only retrieved document passages and attaches clickable [Page X] citation badges that jump the PDF viewer to the exact source page.
Enforces a Strict Grounding Guardrail that alerts the student when a topic is not present in the uploaded PDF rather than hallucinating unsupported answers.
5. Active Recall Flashcards, Smart Notes & AI Audio Podcast
3D Flip Flashcards: Practice key definitions and formulas with "Got It" and "Need Review" spaced-repetition controls.
Smart Study Notepad: Tag notes as Concept, Formula, or Exam Tip and export your complete revision sheet as a Markdown (.md) file.
AI Audio Podcast (Text-to-Speech): Listen to a two-person conversational breakdown (Host Alex & Prof. Williams) of the active chapter using Web Speech synthesis with adjustable playback speeds (1.0x, 1.25x, 1.5x).
6. Progress Dashboard, Weak-Topic Diagnostic & Study History
KPI & Mastery Analytics: Track total uploaded PDFs, saved chapter summaries, average quiz accuracy, and score progression charts (Recharts).
Weak-Topic Identification: Automatically flags low-accuracy chapters from past quiz attempts and links directly to targeted revision.
Exam Countdown & Study Planner: Calculates remaining study days until your target examination date.
System Workflow Architecture
Student Uploads PDF (POST /api/documents/upload) — Drag-and-drop interface validates .pdf MIME type and 25 MB size limit.
Text Extraction & Page Indexing — pdf-parse (backend) and pdf.js (client) extract raw text while preserving page numbers.
Chapter Segmentation & Chunking — Splits lengthy documents into logical chapters and overlapping 600-character RAG chunks.
MongoDB Persistence — Stores document metadata, chapters, and chunks in MongoDB while keeping raw binaries in file/object storage.
AI & RAG Processing — Hosted LLM API generates structured JSON chapter summaries, 4-option MCQs, and citation-backed RAG chat responses.
Student Workspace & Progress Tracking — Stores quiz attempts, saved summaries, and chat logs to power the personalized learning dashboard.
Technology Stack
Layer
Technology
Purpose
Frontend Framework
React 18 + Vite
Fast component-driven SPA with hooks (useState, useMemo, useRef)
Styling & UI
Tailwind CSS + Lucide React
Responsive 3-pane workspace, glassmorphic menus, and iconography
Data Visualization
Recharts
Interactive quiz accuracy trends and mastery progression charts
Client PDF & Speech
pdfjs-dist + Web Speech API
Browser-side PDF text extraction and conversational TTS audio playback
Backend API
Node.js + Express.js
RESTful API routing, multer file validation, and RAG orchestration
Database
MongoDB + Mongoose
Schema modeling for users, documents, summaries, MCQs, quizzes, and chats
Server PDF Parser
pdf-parse
Page-wise text extraction and automatic chapter boundary detection
AI & RAG Engine
Gemini API / OpenAI SDK + BM25/Vector Retrieval
Structured JSON summarization, MCQ generation, and grounded Q&A
Deployment
Vercel (Frontend) + Render (Backend) + MongoDB Atlas
Production cloud hosting architecture

Project Directory Structure
graspr-ai-react-project/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                  # React 18 root entry point
│   ├── index.css                 # Tailwind directives & custom scroll/flip utilities
│   ├── App.jsx                   # Complete 3-pane workspace, 6 views & state engine
│   └── api/
│       └── client.js             # Frontend REST API client wrapper
└── backend/
    ├── package.json
    ├── .env.example
    ├── server.js                 # Express app & MongoDB connection entry point
    ├── models/
    │   ├── User.js               # Student account & target exam profile
    │   ├── Document.js           # PDF metadata, chapters[] & page-indexed chunks[]
    │   ├── Summary.js            # Chapter overview, concepts, definitions & teacher tips
    │   ├── Question.js           # 4-option MCQs with difficulty & pageReference
    │   ├── QuizAttempt.js        # Score, percentage, answers[] & timestamps
    │   └── Conversation.js       # Multi-turn RAG chat messages & citations[]
    ├── services/
    │   ├── pdfService.js         # pdf-parse extraction, chapter splitter & RAG chunker
    │   ├── ragService.js         # Keyword/BM25 chunk retrieval & scoring
    │   └── aiService.js          # LLM prompt templates & JSON schema enforcement
    └── routes/
        ├── documentRoutes.js     # Upload, list, summarize, quiz generation & RAG chat
        ├── quizRoutes.js         # Quiz attempt recording
        └── historyRoutes.js      # Aggregated study history & dashboard KPIs

REST API Endpoints
Method
Endpoint
Description
POST
/api/documents/upload
Upload a .pdf file, validate size/format, extract text, and split chapters
GET
/api/documents
List all uploaded study documents for the authenticated student
GET
/api/documents/:id
Retrieve full document details, chapters, and extracted text
POST
/api/documents/:id/summarize
Generate and save an AI summary for a specific chapter
POST
/api/documents/:id/generate-quiz
Generate difficulty-graded 4-option MCQs in structured JSON
POST
/api/documents/:id/chat
Ask a natural-language question using RAG and return page citations
GET
/api/documents/:id/questions
Retrieve previously generated and saved MCQs for a document
POST
/api/quizzes/attempts
Save an interactive quiz attempt score and per-question breakdown
GET
/api/history
Fetch aggregated dashboard statistics, quiz attempts, summaries, and chats

Database Schema Example (Documents Collection)
{
  "_id": "doc-chem-1802",
  "userId": "663000000000000000000001",
  "title": "Polarity of a Covalent Bond — CHAM 1802",
  "folder": "CHAM 1802",
  "fileUrl": "/uploads/cham_1802_chemical_bonding.pdf",
  "pageCount": 10,
  "chapters": [
    {
      "chapterNumber": 1,
      "title": "5.6.5 Polarity of a Covalent Bond & Dipole Moments",
      "pageStart": 1,
      "pageEnd": 4
    }
  ],
  "createdAt": "2026-10-28T00:00:00.000Z"
}

Getting Started Locally
Prerequisites
Node.js v18+ and npm
MongoDB (local instance or a free MongoDB Atlas cluster)
LLM API Key (Google Gemini API key or OpenAI API key for backend AI routes)
1. Clone the Repository
git clone https://github.com/<your-username>/ai-pdf-study-assistant.git
cd ai-pdf-study-assistant

2. Run the React + Vite Frontend
npm install
npm run dev

Open http://localhost:5173 in your browser. The frontend includes pre-loaded academic documents (CHAM 1802 Chemical Bonding, CS 301 Computer Networks OSI Model, and CS 405 RAG Foundations) so you can test every feature immediately.
3. Run the Express + MongoDB Backend
cd backend
npm install
cp .env.example .env

Update .env with your configuration:
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ai_pdf_study_assistant
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
MAX_FILE_SIZE_MB=25

Start the backend server:
npm run dev

5-Stage Development Roadmap
Stage
Milestone
Deliverable
Stage 1
PDF Upload & Text Extraction
Drag-and-drop React uploader, Express multer validation, pdf-parse extraction, and document viewer
Stage 2
Chapter-Wise AI Summaries
Automatic heading detection, section splitting, key concept/definition extraction, and revision cards
Stage 3
MCQ Generator & Quiz System
Structured JSON 4-option MCQ generation, difficulty filters, instant explanations, and score calculation
Stage 4
RAG Chat with Uploaded Notes
Overlapping chunk retrieval, grounded LLM synthesis, clickable [Page X] citations, and hallucination guardrails
Stage 5
Study History & Progress Dashboard
Persistent QuizAttempts, Recharts score trends, weak-topic diagnostic, and exam countdown planner

Security & Privacy Practices
Strict File Validation: Rejects non-PDF MIME types and enforces a configurable upload size ceiling (25 MB default).
Grounded Context Windowing: Sends only relevant retrieved text chunks to the LLM API rather than exposing unrelated personal metadata.
Storage Separation: Stores raw PDF binaries in dedicated local/cloud object storage (fileUrl) while keeping MongoDB documents lightweight and fast to query.
License
Distributed under the MIT License. Built for students, educators, and lifelong learners.

