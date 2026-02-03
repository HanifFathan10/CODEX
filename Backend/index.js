import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import profile from "./data.json" with { type: "json" };

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// GEN AI
const genAI = new GoogleGenAI({
  apiKey: process.env.SECRET_KEY_GEMINI_API,
});

// API
app.get("/profile", (req, res) => {
  return res.json({
    status: true,
    statusCode: 200,
    data: profile,
  });
});

app.get("/chat", async (req, res) => {
  try {
    const prompt = req.query.prompt || "Halo Gemini!";

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "Kamu adalah CODEX Bot, yang membantu pengunjung website untuk memberikan informasi dan menjawab pertanyaan mereka.",
        // thinkingConfig: {
        //   thinkingLevel: ThinkingLevel.LOW, // Kalo pake ini, ganti modelnya ke "gemini-3-flash-preview"
        // },
        responseJsonSchema: {
          type: "object",
          properties: {
            answer: {
              type: "string",
              role: "Jawaban dari bot",
            },
          },
          required: ["answer"],
        },
      },
    });

    const response = result.text;

    res.status(200).json({
      status: "success",
      message: {
        id: Date.now(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server AI",
    });
  }
});

app.listen(port, () => {
  console.log(`Server CODEX berjalan di http://localhost:${port}`);
});
