const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware"); // multer
const { compressImage } = require("../controllers/imageController");

// Route for compressing multiple images
router.post("/compress", upload.array("file"), compressImage);

module.exports = router;


//resize tool
const { resizeImage } = require("../controllers/imageController");

router.post("/resize", upload.array("file"), resizeImage);

//crop tool
const { cropImage } = require("../controllers/imageController");

router.post("/crop", upload.array("file"), cropImage);

//resize tool
const { convertImage } = require("../controllers/imageController");

router.post("/convert", upload.array("file"), convertImage);

