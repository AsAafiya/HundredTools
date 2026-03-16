const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

//compress images
exports.compressImage = async (req, res) => {
  try {
    console.log("compress image route hit");

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const compressedFiles = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path.basename(file.originalname, ext);

      const outputPath = `outputs/compressed-${baseName}.jpg`;

      await sharp(file.path)
        .jpeg({ quality: 60 })
        .toFile(outputPath);

      compressedFiles.push({
        path: outputPath,
        name: `compressed-${baseName}.jpg`,
      });
    }

  
    if (compressedFiles.length === 1) {
      return res.download(compressedFiles[0].path, `Nexora_compressImage.jpg`);
    }


    const zipName = "Nexora_compressImage.zip";
    const zipPath = path.join("outputs", zipName);
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

    const { width, height } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const resizedFiles = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);

      const outputPath = `outputs/resized-${baseName}.jpg`;

      await sharp(file.path)
        .resize(parseInt(width), parseInt(height))
        .jpeg({ quality: 80 })
        .toFile(outputPath);

      resizedFiles.push({
        path: outputPath,
        name: `resized-${baseName}.jpg`
      });
    }


    if (resizedFiles.length === 1) {
      return res.download(resizedFiles[0].path, "Nexora_resizeImage.jpg");
    }

   
    const zipName = "Nexora_resizeImage.zip";
    const zipPath = path.join("outputs", zipName);

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

    const { x, y, width, height } = req.body;

    const croppedFiles = [];

    for (const file of req.files) {

      const outputPath = `outputs/cropped-${file.originalname}`;

      await sharp(file.path)
        .extract({
          left: parseInt(x),
          top: parseInt(y),
          width: parseInt(width),
          height: parseInt(height)
        })
        .toFile(outputPath);

      croppedFiles.push(outputPath);
    }

    // Multiple images → zip
    if (croppedFiles.length > 1) {

      const zipPath = "outputs/Nexora_cropImage.zip";
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip");

      archive.pipe(output);

      croppedFiles.forEach(file => {
        archive.file(file, { name: file.split("/").pop() });
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

    const { format } = req.body;
    const convertedFiles = [];

    for (const file of req.files) {

      const outputPath = `outputs/converted-${Date.now()}.${format}`;

      await sharp(file.path)
        .toFormat(format)
        .toFile(outputPath);

      convertedFiles.push(outputPath);
    }

    // Multiple images → ZIP
    if (convertedFiles.length > 1) {

      const zipPath = "outputs/Nexora_convertImage.zip";
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip");

      archive.pipe(output);

      convertedFiles.forEach(file => {
        archive.file(file, { name: file.split("/").pop() });
      });

      await archive.finalize();

      output.on("close", () => {
        res.download(zipPath);
      });

    } else {

      res.download(
        convertedFiles[0],
        `Nexora_convertImage.${format}`
      );

    }

  } catch (error) {

    console.log(error);
    res.status(500).send("Error converting image");

  }
};
