const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Patel Restaurant AI Backend Running" });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", aiRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});