const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
// const { mergePDF } = require("../controllers/pdfController");

// router.post("/merge", upload.array("files"), mergePDF);

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

router.post("/merge", upload.array("files"), mergePDF);

router.post("/pdf-to-word", upload.single("file"), pdfToWord);

router.post("/word-to-pdf", upload.single("file"), wordToPdf);

router.post("/add-watermark", upload.single("file"), addWatermark);

router.post("/pdf-to-jpg", upload.single("file"), pdfToJpg);

router.post("/jpg-to-pdf", upload.array("files"), jpgToPdf);

router.post("/add-page-numbers", upload.single("file"), addPageNumbers);
router.post("/split", upload.single("file"), splitPDF);

router.post("/compress", upload.single("file"), compressPDF);

module.exports = router;
