const express = require("express");
const cors = require("cors");
const { getAIResponse } = require("./services/aiService");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Patel Restaurant AI Backend Running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    const answer = await getAIResponse(question);

    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});