const express = require("express");
const cors = require("cors");

const pdfRoutes = require("./routes/pdfRoutes");
const startCleanupJob = require("./utils/cleanupFiles");
const imageRoutes = require("./routes/imageRoute"); 

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/pdf", pdfRoutes);
app.use("/api/image", imageRoutes); 

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