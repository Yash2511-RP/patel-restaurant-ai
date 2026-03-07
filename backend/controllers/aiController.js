const { getAIResponse } = require("../services/aiService");

const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ answer: "Question is required." });
    }

    const answer = await getAIResponse(question);
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Server error." });
  }
};

module.exports = { askAI };
