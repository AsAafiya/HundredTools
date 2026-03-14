const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
// const { mergePDF } = require("../controllers/pdfController");

// router.post("/merge", upload.array("files"), mergePDF);

const {compressPDF}=require("../controllers/compressController");

router.post("/compress", upload.single("file"),compressPDF);

module.exports = router;