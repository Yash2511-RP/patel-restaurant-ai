const { getAIResponse } = require("../services/aiService");

const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ answer: "Question is required." });
    }

    const answer = await getAIResponse(question);
    return res.json({ answer });
  } catch (error) {
    console.error("AI controller error:", error.message);
    return res.status(500).json({ answer: "Server error." });
  }
};

module.exports = { askAI };
