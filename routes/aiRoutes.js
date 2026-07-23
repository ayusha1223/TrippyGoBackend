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

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are TrippyGo AI.

You are a Nepal travel expert.

Help users with:

- Trekking
- Destinations
- Hotels
- Weather
- Food
- Transportation
- Nepal Culture
- Budget Travel
- Travel Tips

Reply naturally like ChatGPT.

Do NOT generate JSON.
`,
        },

        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      answer: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("========== AI CHAT ERROR ==========");
    console.error(error);

    res.status(500).json({
      message: error.message || "AI request failed",
    });
  }
});


router.post("/generate-itinerary", async (req, res) => {
  try {
    const {
      destination,
      days,
      budget,
      interests,
    } = req.body;

    if (!destination || !days) {
      return res.status(400).json({
        message: "Destination and days are required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are TrippyGo AI.

Generate detailed Nepal travel itineraries.

Return ONLY valid JSON.

Never use markdown.

Never explain anything.

Return EXACTLY this format:

{
  "destination": "",
  "title": "",
  "days": 0,
  "budget": 0,
  "itinerary": [
    {
      "day": 1,
      "title": "",
      "description": ""
    }
  ]
}
`,
        },

        {
          role: "user",
          content: `
Destination: ${destination}

Days: ${days}

Budget: ${budget}

Interests: ${interests}
`,
        },
      ],
    });

    res.json({
      itinerary: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("========== ITINERARY ERROR ==========");
    console.error(error);

    res.status(500).json({
      message: error.message || "Failed to generate itinerary",
    });
  }
});

module.exports = router;