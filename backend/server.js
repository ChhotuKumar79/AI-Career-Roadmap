const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-career-roadmap-iota.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection
let mongoConnectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        console.log("MongoDB connected successfully ✅");
      })
      .catch((error) => {
        mongoConnectionPromise = null;
        console.error("MongoDB connection failed ❌");
        console.error(error.message);
        throw error;
      });
  }

  await mongoConnectionPromise;
};

// Wait for MongoDB before API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Career Roadmap Backend is running 🚀",
  });
});

// Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Vercel
module.exports = app;