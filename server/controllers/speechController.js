const fs = require("fs");
const { OpenAI } = require("openai");

exports.transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error("OPENAI_API_KEY is not configured. Set it in server/.env or your environment variables.");
      return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
    }

    const openai = new OpenAI({ apiKey: openaiApiKey });
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    const text = transcription?.text || "";

    return res.json({ text });
  } catch (error) {
    console.error("Speech transcription error:", error);
    return res.status(500).json({ error: "Speech transcription failed" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Failed to remove uploaded audio file:", err);
        }
      });
    }
  }
};
