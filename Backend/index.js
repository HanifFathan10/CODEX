import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
// import sqlite3 from "sqlite3";
// import path from "path";
// import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// DATABASE
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const dbPath = path.resolve(__dirname, "persona.db");
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error("Gagal menyambung ke database:", err.message);
//   } else {
//     console.log("Terhubung ke database SQLite.");
//     initializeDatabase();
//   }
// });

// function initializeDatabase() {
//   const query = `
//         CREATE TABLE IF NOT EXISTS person (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name VARCHAR(100) NOT NULL,
//             role VARCHAR(100) NOT NULL,
//             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//     `;
//   db.run(query, (err) => {
//     if (err) {
//       console.error("Gagal membuat tabel:", err.message);
//     } else {
//       console.log("Database + tabel siap digunakan.");
//     }
//   });
// }

// GEN AI
const genAI = new GoogleGenAI({
  apiKey: process.env.SECRET_KEY_GEMINI_API,
});

// API
// GET
// app.get("/api/person", (req, res) => {
//   const sql = "SELECT * FROM person";
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({
//       message: "Berhasil mengambil semua produk",
//       data: rows,
//     });
//   });
// });

// CREATE
// app.post("/api/person", (req, res) => {
//   const { name, role } = req.body;

//   if (!name || !role) {
//     return res.status(400).json({ error: "Nama dan role wajib diisi" });
//   }

//   const sql = "INSERT INTO person (name, role) VALUES (?, ?)";
//   const params = [name, role || 0];

//   db.run(sql, params, function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({
//       message: "Person berhasil ditambahkan",
//       data: {
//         id: this.lastID,
//         name,
//         role,
//       },
//     });
//   });
// });

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
