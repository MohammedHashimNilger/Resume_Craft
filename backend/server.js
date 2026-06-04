// server.js — ResumeCraft unified backend entry point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Validate required env vars ────────────────────────────────────────────────
if (!process.env.GROQ_API_KEY) {
  console.error("❌  GROQ_API_KEY is missing in .env");
  process.exit(1);
}
if (!process.env.MONGO_URI) {
  console.error("❌  MONGO_URI is missing in .env");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("❌  JWT_SECRET is missing in .env");
  process.exit(1);
}

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "5mb" })); // 5mb to handle base64 profile photos

// ── Database Connection ───────────────────────────────────────────────────────
connectDB();

// ── Routes Mounting ───────────────────────────────────────────────────────────
app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ status: "ok", time: new Date() }));

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  ResumeCraft API → http://localhost:${PORT}`);
});