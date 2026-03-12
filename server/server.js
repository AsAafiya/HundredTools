const express = require("express");
const cors = require("cors");

const pdfRoutes = require("./routes/pdfRoutes");
const startCleanupJob = require("./utils/cleanupFiles");

const app = express();

app.use(cors());

app.use("/api/pdf", pdfRoutes);

// start background cleanup job
startCleanupJob();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});