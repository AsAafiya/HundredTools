const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { transcribeAudio } = require("../controllers/speechController");

const router = express.Router();

router.post("/transcribe", upload.single("audio"), transcribeAudio);

module.exports = router;
