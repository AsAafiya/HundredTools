const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const removeBackground = require("../services/removeBgService");

const outputDir = path.resolve(__dirname, "../outputs");

const ensureOutputDir = () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
};

//compress images
exports.compressImage = async (req, res) => {
  try {
    console.log("compress image route hit");
    ensureOutputDir();

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const { level } = req.body;

    // Set compression quality based on level
    let quality;

    if (level === "high") {
      quality = 30; // highest compression
    } 
    else if (level === "medium") {
      quality = 60;
    } 
    else {
      quality = 85; // lowest compression
    }

    const compressedFiles = [];

    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];

      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path.basename(file.originalname, ext);

      const outputPath = path.join(
        outputDir,
        `compressed-${Date.now()}-${index}-${baseName}.jpg`
      );

      await sharp(file.path)
        .jpeg({ quality })
        .toFile(outputPath);

      compressedFiles.push({
        path: outputPath,
        name: `compressed-${baseName}.jpg`,
      });

    }

    // If only one file
    if (compressedFiles.length === 1) {
      return res.download(
        compressedFiles[0].path,
        "Nexora_compressImage.jpg"
      );
    }

    // If multiple files → create ZIP
    const zipName = "Nexora_compressImage.zip";
    const zipPath = path.join(outputDir, zipName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      return res.download(zipPath, zipName);
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);

    for (const file of compressedFiles) {
      archive.file(file.path, { name: file.name });
    }

    await archive.finalize();

  } catch (error) {
    console.error(error);
    res.status(500).send("Error compressing images");
  }
};

//resize image
exports.resizeImage = async (req, res) => {
  try {
    console.log("resize image route hit");
    ensureOutputDir();

    const { width, height } = req.body;
    const parsedWidth = parseInt(width, 10);
    const parsedHeight = parseInt(height, 10);

    if (Number.isNaN(parsedWidth) || Number.isNaN(parsedHeight)) {
      return res.status(400).send("Valid width and height are required");
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const resizedFiles = [];

    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);

      const outputPath = path.join(
        outputDir,
        `resized-${Date.now()}-${index}-${baseName}.jpg`
      );

      await sharp(file.path)
        .resize(parsedWidth, parsedHeight)
        .jpeg({ quality: 80 })
        .toFile(outputPath);

      resizedFiles.push({
        path: outputPath,
        name: `resized-${baseName}.jpg`,
      });
    }

    if (resizedFiles.length === 1) {
      return res.download(resizedFiles[0].path, "Nexora_resizeImage.jpg");
    }

    const zipName = "Nexora_resizeImage.zip";
    const zipPath = path.join(outputDir, zipName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      res.download(zipPath, zipName);
    });

    archive.pipe(output);

    resizedFiles.forEach((file) => {
      archive.file(file.path, { name: file.name });
    });

    await archive.finalize();
  } catch (error) {
    console.log(error);
    res.status(500).send("Error resizing images");
  }
};

//crop tool
exports.cropImage = async (req, res) => {
  try {
    console.log("crop image route hit");
    ensureOutputDir();

    const { x, y, width, height } = req.body;
    const left = parseInt(x, 10);
    const top = parseInt(y, 10);
    const cropWidth = parseInt(width, 10);
    const cropHeight = parseInt(height, 10);

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    if (
      Number.isNaN(left) ||
      Number.isNaN(top) ||
      Number.isNaN(cropWidth) ||
      Number.isNaN(cropHeight)
    ) {
      return res.status(400).send("Valid crop values are required");
    }

    const croppedFiles = [];

    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      const ext = path.extname(file.originalname) || ".jpg";
      const baseName = path.basename(file.originalname, ext);
      const outputPath = path.join(
        outputDir,
        `cropped-${Date.now()}-${index}-${baseName}${ext}`
      );

      await sharp(file.path)
        .extract({
          left,
          top,
          width: cropWidth,
          height: cropHeight,
        })
        .toFile(outputPath);

      croppedFiles.push(outputPath);
    }

    // Multiple images → zip
    if (croppedFiles.length > 1) {
      const zipPath = path.join(outputDir, "Nexora_cropImage.zip");
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip");

      archive.on("error", (err) => {
        throw err;
      });

      archive.pipe(output);

      croppedFiles.forEach((file) => {
        archive.file(file, { name: path.basename(file) });
      });

      await archive.finalize();

      output.on("close", () => {
        res.download(zipPath);
      });
    } else {
      res.download(croppedFiles[0], "Nexora_cropImage.jpg");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error cropping images");
  }
};

//convert image
exports.convertImage = async (req, res) => {
  try {
    console.log("convert image route hit");
    ensureOutputDir();

    const format = (req.body.format || "").toLowerCase();

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    if (!format) {
      return res.status(400).send("Output format is required");
    }

    const convertedFiles = [];

    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      const ext = file.originalname.split(".").pop().toLowerCase();
      const baseName = path.basename(file.originalname, path.extname(file.originalname));

      // Prevent raster to SVG
      if (format === "svg" && ext !== "svg") {
        return res.status(400).send("Only SVG files can be converted to SVG");
      }

      const outputPath = path.join(
        outputDir,
        `converted-${Date.now()}-${index}-${baseName}.${format}`
      );

      await sharp(file.path).toFormat(format).toFile(outputPath);

      convertedFiles.push(outputPath);
    }

    if (convertedFiles.length > 1) {
      const zipPath = path.join(outputDir, "Nexora_convertImage.zip");
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip");

      archive.on("error", (err) => {
        throw err;
      });

      archive.pipe(output);

      convertedFiles.forEach((file) => {
        archive.file(file, { name: path.basename(file) });
      });

      await archive.finalize();

      output.on("close", () => {
        res.download(zipPath);
      });
    } else {
      res.download(convertedFiles[0], `Nexora_convertImage.${format}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting image");
  }
};

// Remove Image Background
exports.removeBgController = async (req, res) => {
  try {
    console.log("remove background route hit");
    ensureOutputDir();

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const inputPath = req.file.path;
    const outputPath = path.join(
      outputDir,
      `removebg-${Date.now()}.png`
    );

    await removeBackground(inputPath, outputPath);

    return res.download(outputPath, "background-removed.png");
  } catch (error) {
    console.error("Error in removeBgController:", error);
    res.status(500).send("Error removing background from image: " + error.toString());
  }
};

