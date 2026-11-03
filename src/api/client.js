const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function uploadPDF(file, title, folder) {
  const formData = new FormData();
  formData.append('pdf', file);
  if (title) formData.append('title', title);
  if (folder) formData.append('folder', folder);
  const res = await fetch(`${API_BASE}/documents/upload`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error((await res.json()).error || 'Upload failed');
  return res.json();
}

export async function fetchDocuments() {
  const res = await fetch(`${API_BASE}/documents`);
  return res.json();
}

export async function fetchDocumentById(id) {
  const res = await fetch(`${API_BASE}/documents/${id}`);
  return res.json();
}

export async function generateSummary(id, chapterTitle) {
  const res = await fetch(`${API_BASE}/documents/${id}/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapterTitle })
  });
  return res.json();
}

export async function generateQuiz(id, chapterTitle, difficulty = 'Medium', count = 5) {
  const res = await fetch(`${API_BASE}/documents/${id}/generate-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapterTitle, difficulty, count })
  });
  return res.json();
}

export async function askDocumentQuestion(id, question) {
  const res = await fetch(`${API_BASE}/documents/${id}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  return res.json();
}

export async function saveQuizAttempt(payload) {
  const res = await fetch(`${API_BASE}/quizzes/attempts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchStudyHistory() {
  const res = await fetch(`${API_BASE}/history`);
  return res.json();
}
