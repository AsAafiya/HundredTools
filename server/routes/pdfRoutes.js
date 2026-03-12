const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { mergePDF, addPageNumbers } = require("../controllers/pdfController");

router.post("/merge", upload.array("files"), mergePDF);

// router.post("/pdf-to-jpg", upload.single("file"), pdfToJpg);

// router.post("/jpg-to-pdf", upload.array("files"), jpgToPdf);

router.post("/add-page-numbers", upload.single("file"), addPageNumbers);

module.exports = router;