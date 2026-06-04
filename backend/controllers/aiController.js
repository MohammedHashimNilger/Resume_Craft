const fetch = require("node-fetch");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL   = "llama-3.3-70b-versatile";

// POST /api/ai
exports.generateAI = async (req, res) => {
  const { systemPrompt, userMessage } = req.body;

  if (!systemPrompt || !userMessage)
    return res.status(400).json({ error: "systemPrompt and userMessage are required." });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY,
      },
      body: JSON.stringify({
        model:      GROQ_MODEL,
        max_tokens: 1000,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userMessage  },
        ],
      }),
    });

    const data = await response.json();

    if (data.error)
      return res.status(500).json({ error: data.error.message });

    const text = data.choices?.[0]?.message?.content || "";
    return res.json({ text });

  } catch (err) {
    console.error("Groq fetch error:", err);
    return res.status(500).json({ error: "Failed to reach Groq API." });
  }
};
