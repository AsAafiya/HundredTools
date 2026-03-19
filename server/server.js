
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const pdfRoutes = require("./routes/pdfRoutes.js");
const imageRoutes = require("./routes/imageRoute.js");
const authRoutes = require("./routes/authRoutes.js");
const startCleanupJob = require("./utils/cleanupFiles.js");

dotenv.config();

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/pdf", pdfRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/auth", authRoutes); // 🔥 ADD THIS

// start background cleanup job
startCleanupJob();

/* Test route */
app.get("/", (req, res) => {
  res.send("HundredTools Backend Running");
});

/* Start server */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});