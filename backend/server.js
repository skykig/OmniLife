import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Home Route
app.get("/", (req, res) => {
  res.json({
    app: "OmniLife AI",
    status: "Running",
    version: "1.0.0"
  });
});

// Chat Route
app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required."
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are OmniLife AI, a smart, friendly, helpful personal assistant."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "⚠️ OmniLife AI server error."
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`🚀 OmniLife Backend Running on Port ${PORT}`);

});
