import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "OmniLife Nova AI",
    provider: "Groq",
    version: "3.0.0",
    status: "Running"
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are Nova AI, the personal AI assistant inside the OmniLife app. Be friendly, helpful and concise."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error("Groq Error:", err);

    res.status(500).json({
      reply: err.message || "Groq Server Error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 OmniLife Groq Backend Running on Port ${PORT}`);
});
