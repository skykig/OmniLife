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

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "OmniLife Nova AI",
    version: "1.0.0",
    status: "Running"
  });
});

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please send a message."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: [
        {
          role: "system",
          content: "You are Nova AI, the personal AI assistant inside the OmniLife app. Be friendly, helpful, and concise."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.output_text
    });

  } catch (err) {

   } catch (err) {

  console.error("OpenAI Error:", err);

  res.status(500).json({
    reply: err.message
  });

}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 OmniLife Backend Running on Port ${PORT}`);
});
