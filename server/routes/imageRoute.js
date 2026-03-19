
const express = require("express");
const upload = require("../middleware/uploadMiddleware.js");
const {
  compressImage,
  resizeImage,
  cropImage,
  convertImage,
} = require("../controllers/imageController.js");

const router = express.Router();

// compress images
router.post("/compress", upload.array("file"), compressImage);

// resize images
router.post("/resize", upload.array("file"), resizeImage);

// crop images
router.post("/crop", upload.array("file"), cropImage);

// convert images
router.post("/convert", upload.array("file"), convertImage);

module.exports = router;