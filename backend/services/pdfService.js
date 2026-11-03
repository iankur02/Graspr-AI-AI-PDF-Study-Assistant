const pdfParse = require('pdf-parse');

/**
 * Extracts text, page count, automatic chapter boundaries, and RAG chunks from a PDF buffer.
 */
async function extractAndStructurePDF(buffer) {
  const pages = [];

  const options = {
    pagerender: function(pageData) {
      return pageData.getTextContent().then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
          if (lastY == item.transform[5] || !lastY) {
            text += item.str;
          } else {
            text += '\n' + item.str;
          }
          lastY = item.transform[5];
        }
        pages.push(text.trim());
        return text;
      });
    }
  };

  const data = await pdfParse(buffer, options);
  const totalPages = pages.length || data.numpages || 1;

  // Detect chapters using common heading patterns or fallback to page ranges (Stage 2 fallback)
  const chapters = [];
  const headingRegex = /^(?:Chapter\s+\d+|Unit\s+\d+|Section\s+\d+(?:\.\d+)*|\d+\.\d+(?:\.\d+)?\s+[A-Z][A-Za-z\s]{3,50})/m;

  let currentChapter = {
    chapterNumber: 1,
    title: 'Chapter 1: Introduction & Core Foundations',
    pageStart: 1,
    pageEnd: 1,
    content: ''
  };

  pages.forEach((pageText, idx) => {
    const pageNum = idx + 1;
    const match = pageText.match(headingRegex);
    if (match && idx > 0 && currentChapter.content.length > 400) {
      currentChapter.pageEnd = pageNum - 1;
      chapters.push({ ...currentChapter });
      currentChapter = {
        chapterNumber: chapters.length + 1,
        title: match[0].trim().slice(0, 80),
        pageStart: pageNum,
        pageEnd: pageNum,
        content: pageText
      };
    } else {
      currentChapter.pageEnd = pageNum;
      currentChapter.content += (currentChapter.content ? '\n\n' : '') + pageText;
    }
  });
  chapters.push(currentChapter);

  // Fallback if only 1 giant chapter and > 4 pages: split into logical page-range sections
  if (chapters.length === 1 && totalPages >= 4) {
    chapters.length = 0;
    const pagesPerSection = Math.ceil(totalPages / 3);
    for (let i = 0; i < totalPages; i += pagesPerSection) {
      const slice = pages.slice(i, i + pagesPerSection);
      chapters.push({
        chapterNumber: chapters.length + 1,
        title: `Section ${chapters.length + 1} (Pages ${i + 1}–${Math.min(i + pagesPerSection, totalPages)})`,
        pageStart: i + 1,
        pageEnd: Math.min(i + pagesPerSection, totalPages),
        content: slice.join('\n\n')
      });
    }
  }

  // Create overlapping ~600-character chunks with page numbers for Stage 4 RAG
  const chunks = [];
  pages.forEach((pageText, idx) => {
    const pageNumber = idx + 1;
    const paragraphs = pageText.split(/\n{2,}/).filter(Boolean);
    let bufferText = '';
    let chunkIndex = 0;
    for (const para of paragraphs) {
      if ((bufferText + ' ' + para).length > 650 && bufferText.length > 150) {
        chunks.push({ pageNumber, chunkIndex: chunkIndex++, text: bufferText.trim() });
        bufferText = para;
      } else {
        bufferText += (bufferText ? '\n' : '') + para;
      }
    }
    if (bufferText.trim()) {
      chunks.push({ pageNumber, chunkIndex: chunkIndex++, text: bufferText.trim() });
    }
  });

  return {
    extractedText: data.text,
    pageCount: totalPages,
    chapters,
    chunks
  };
}

module.exports = { extractAndStructurePDF };
