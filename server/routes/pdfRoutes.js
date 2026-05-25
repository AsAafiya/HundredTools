const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  mergePDF,
  addPageNumbers,
  pdfToJpg,
  jpgToPdf,
  pdfToWord,
  wordToPdf,
  addWatermark,
  splitPDF,
  compressPDF
} = require("../controllers/pdfController");

// Merge
router.post("/merge", upload.array("files"), mergePDF);

// Compress
router.post("/compress", upload.single("file"), compressPDF);

// Split
router.post("/split", upload.single("file"), splitPDF);

// PDF to Word
router.post("/pdf-to-word", upload.single("file"), pdfToWord);

// Word to PDF
router.post("/word-to-pdf", upload.single("file"), wordToPdf);

// Add Watermark
router.post("/add-watermark", upload.single("file"), addWatermark);

// PDF to JPG
router.post("/pdf-to-jpg", upload.single("file"), pdfToJpg);

// JPG to PDF
router.post("/jpg-to-pdf", upload.array("files"), jpgToPdf);

// Add Page Numbers
router.post("/add-page-numbers", upload.single("file"), addPageNumbers);

module.exports = router;