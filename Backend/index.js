import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// TODO: Import GoogleGenAI dari library @google/genai (Akan dikerjakan di Pertemuan 4)
// import { GoogleGenAI } from "@google/genai";

// TODO: Import data profile dari file JSON (Akan dikerjakan di Pertemuan 3/4)
// import profile from "./data.json" with { type: "json" };

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// TODO: Konfigurasi API KEY Gemini di sini (Pertemuan 4)
// const genAI = ...

app.get("/", (req, res) => {
  res.send("Server CODEX Running Brow!!!");
});

app.get("/profile", (req, res) => {
  // TODO: Ganti ini agar mengirim data dari variable 'profile' (Pertemuan 3)
  res.json({
    status: false,
    message: "Endpoint ini belum di-coding! Silakan buka index.js",
    data: null,
  });
});

app.get("/chat", async (req, res) => {
  try {
    const prompt = req.query.prompt || "Halo";

    // TODO: Validasi prompt kosong

    // TODO: Panggil Model Gemini AI di sini (Pertemuan 4)
    // const result = await genAI.models.generateContent(...)
    // const responseText = result.text;

    // Placeholder Response (Sebelum AI aktif)
    const dummyResponse = `Halo! Saya CODEX Bot. Tapi otak saya belum dipasang di index.js. Kamu mengirim: "${prompt}"`;

    res.status(200).json({
      status: "success",
      message: {
        id: Date.now(),
        role: "assistant",
        content: dummyResponse,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
});

app.listen(port, () => {
  console.log(`Server CODEX berjalan di http://localhost:${port}`);
});
