const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
// const { mergePDF } = require("../controllers/pdfController");

// router.post("/merge", upload.array("files"), mergePDF);

module.exports = router;

const {
 mergePDF,
 pdfToWord,
 wordToPdf,
 addWatermark
} = require("../controllers/pdfController");

router.post("/merge", upload.array("files"), mergePDF);

router.post("/pdf-to-word", upload.single("file"), pdfToWord);

router.post("/word-to-pdf", upload.single("file"), wordToPdf);

router.post("/add-watermark", upload.single("file"), addWatermark);