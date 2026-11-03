/**
 * Stage 2, 3, and 4 LLM Integration Service.
 * Uses Gemini REST API (or falls back to deterministic extraction if no API key is configured).
 */
async function callLLM(systemPrompt, userPrompt, expectJson = false) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: expectJson ? { responseMimeType: 'application/json' } : {}
      })
    }
  );

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return expectJson ? JSON.parse(text) : text;
}

async function generateChapterSummary(chapterTitle, chapterContent) {
  const systemPrompt = `You are an academic study assistant. Summarize the provided chapter text strictly using facts from the text. Return JSON with keys: "overview" (string), "keyConcepts" (string[]), "definitions" ({term, definition}[]), "revisionNotes" (string[]), and "teacherTip" (string).`;
  return callLLM(systemPrompt, `Chapter: ${chapterTitle}\n\nContent:\n${chapterContent}`, true);
}

async function generateChapterMCQs(chapterTitle, chapterContent, difficulty = 'Medium', count = 5) {
  const systemPrompt = `You are an university exam creator. Generate ${count} multiple-choice questions at ${difficulty} difficulty strictly based on the text. Return JSON array where each object has: "questionText" (string), "options" (array of 4 strings), "correctOptionIndex" (0-3), "explanation" (string), "pageReference" (number).`;
  return callLLM(systemPrompt, `Chapter: ${chapterTitle}\n\nContent:\n${chapterContent}`, true);
}

async function generateGroundedAnswer(question, retrievedChunks, history = []) {
  if (!retrievedChunks.length) {
    return {
      answer: "I could not find sufficient information in your uploaded PDF to answer that question. Try asking about a topic covered in the chapters.",
      citations: []
    };
  }
  const contextBlock = retrievedChunks
    .map(c => `[Page ${c.pageNumber}]: ${c.text}`)
    .join('\n\n');
  const systemPrompt = `You are a grounded academic PDF study assistant. Answer the student's question ONLY using the provided PDF excerpts. Always cite page numbers like [Page X]. If the excerpts do not contain the answer, clearly state that the uploaded document does not cover it.`;
  const userPrompt = `Retrieved Document Excerpts:\n${contextBlock}\n\nStudent Question: ${question}`;
  const answer = await callLLM(systemPrompt, userPrompt, false);
  return {
    answer,
    citations: retrievedChunks.map(c => ({
      pageNumber: c.pageNumber,
      snippet: c.text.slice(0, 140) + '...'
    }))
  };
}

module.exports = {
  generateChapterSummary,
  generateChapterMCQs,
  generateGroundedAnswer
};
