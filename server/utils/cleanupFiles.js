const fs = require("fs");
const path = require("path");

const outputsDir = path.join(__dirname, "../outputs");
const uploadsDir = path.join(__dirname, "../uploads");

const MAX_FILE_AGE = 60 * 60 * 1000; // 1 hour

function cleanFolder(folderPath) {

  if (!fs.existsSync(folderPath)) return;

  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {

    const filePath = path.join(folderPath, file);

    const stats = fs.statSync(filePath);

    const age = Date.now() - stats.mtimeMs;

    if (age > MAX_FILE_AGE) {
      fs.rmSync(filePath, { recursive: true, force: true });
      console.log("Deleted old file:", filePath);
    }

  });

}

function startCleanupJob() {

  setInterval(() => {

    console.log("Running cleanup job...");

    cleanFolder(outputsDir);
    cleanFolder(uploadsDir);

  }, 60 * 60 * 1000); // runs every hour

}

module.exports = startCleanupJob;