require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const { getAIResponse } = require("./services/aiService");

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Patel Restaurant AI Backend Running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

app.get("/api/debug-db", (req, res) => {
  res.status(200).json({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const tablesResult = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    );

    const tables = tablesResult.rows.map((row) => row.table_name);

    res.status(200).json({
      success: true,
      stats: {
        totalTables: tables.length,
        tables,
      },
    });
  } catch (error) {
    console.error("Dashboard route error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to load dashboard data",
    });
  }
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question } = req.body || {};

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        error: "Question is required",
      });
    }

    const answer = await getAIResponse(question.trim());

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI route error:", error);
    return res.status(500).json({
      success: false,
      error: "AI error",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});