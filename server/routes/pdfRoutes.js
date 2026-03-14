const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
// const { mergePDF } = require("../controllers/pdfController.js");
const { splitPDF } = require("../controllers/splitController.js");
// const { compressPDF } = require("../controllers/compressController.js");

// router.post("/merge", upload.array("files"), mergePDF);
router.post("/split", upload.single("file"), splitPDF);
// router.post("/compress", upload.single("file"), compressPDF);
// router.post("/create", upload.array("images"), createPDF);

module.exports = router;