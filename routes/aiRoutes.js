const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/guide", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are Sherpa AI, a Nepal tourism expert.

Help users with:
- Trekking routes
- Hotels
- Transportation
- Weather
- Food
- Permits
- Travel planning
- Nepalese culture

Give accurate and helpful travel advice.
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    res.json({
      answer:
        completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("========== GROQ ERROR ==========");
    console.error(error);

    res.status(500).json({
      message: error.message || "AI request failed",
    });
  }
});

module.exports = router;

