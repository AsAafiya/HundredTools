require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pdfRoutes = require("./routes/pdfRoutes");
const startCleanupJob = require("./utils/cleanupFiles");
const imageRoutes = require("./routes/imageRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/pdf", pdfRoutes);
app.use("/api/image", imageRoutes); 
app.use("/api/auth", authRoutes);

// start background cleanup job
startCleanupJob();

/* Test route */
app.get("/", (req, res) => {
  res.send("HundredTools Backend Running");
});

/* Start server */
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on PORT 5000...");
});

console.log(process.env.JWT_SECRET);