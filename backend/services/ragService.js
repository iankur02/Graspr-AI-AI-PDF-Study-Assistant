/**
 * Stage 4: Retrieval-Augmented Generation (RAG) chunk scorer.
 * Computes keyword & BM25-style overlap between user query and document chunks.
 */
const STOP_WORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'in', 'to', 'of', 'for',
  'with', 'as', 'by', 'that', 'this', 'it', 'from', 'or', 'are', 'was', 'were',
  'what', 'how', 'why', 'when', 'where', 'explain', 'define', 'describe', 'tell'
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOP_WORDS.has(t));
}

function retrieveRelevantChunks(chunks, query, topK = 3) {
  const queryTokens = tokenize(query);
  if (!queryTokens.length) return chunks.slice(0, topK);

  const scored = chunks.map(chunk => {
    const chunkLower = chunk.text.toLowerCase();
    let score = 0;
    for (const token of queryTokens) {
      if (chunkLower.includes(token)) {
        const occurrences = chunkLower.split(token).length - 1;
        score += 2 + Math.min(occurrences, 3);
      }
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const relevant = scored.filter(item => item.score > 0).slice(0, topK);

  return relevant.map(r => ({
    pageNumber: r.chunk.pageNumber,
    text: r.chunk.text,
    score: r.score
  }));
}

module.exports = { retrieveRelevantChunks };
