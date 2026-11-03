# Graspr AI — AI PDF Study Assistant (React + Vite + Tailwind CSS Project)

This repository contains the complete **React 18 + Vite + Tailwind CSS** project converted from the HTML prototype, paired with the **Node.js + Express + MongoDB** backend.

## Project Structure
```
graspr-ai-react-project/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── api/
│   │   └── client.js
│   └── components/
│       └── README.md
└── backend/
    ├── package.json
    ├── .env.example
    ├── server.js
    ├── models/
    ├── services/
    └── routes/
```

## Getting Started (Frontend React App)
```bash
npm install
npm run dev
```
Then open `http://localhost:5173` in your browser.

## Getting Started (Optional Express + MongoDB Backend)
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
