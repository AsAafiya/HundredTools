const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { name, skills, projects } = req.body;

    const prompt = `
Create professional resume content.

Name:
${name}

Skills:
${skills}

Projects:
${projects}

Write:
1. Professional summary
2. Skills description
3. Professional project description
`;

    const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
   model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);
    res.json({
      result: response.data.choices[0].message.content
    });

  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      error: "AI generation failed"
    });
  }
});

module.exports = router;