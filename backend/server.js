const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Patel Restaurant AI Backend Running" });
});

app.post("/api/ask-ai", (req, res) => {
  const { question } = req.body;

  let answer = "AI is still learning.";

  if (question && question.toLowerCase().includes("sales")) {
    answer = "Today's sales are strong. Paneer Pizza is the top-selling item.";
  }

  if (question && question.toLowerCase().includes("inventory")) {
    answer = "Cheese stock is running low. You should place a vendor order.";
  }

  if (question && question.toLowerCase().includes("staff")) {
    answer = "You currently have 12 staff on shift.";
  }

  res.json({ answer });
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});