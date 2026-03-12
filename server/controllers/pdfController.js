const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { fromPath } = require("pdf2pic");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");


/* ---------------- MERGE PDF ---------------- */

exports.mergePDF = async (req, res) => {
  console.log("Route hit");
  console.log("files:", req.files);

  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);

      const pdf = await PDFDocument.load(pdfBytes);

      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    const outputPath = "outputs/merged.pdf";

    fs.writeFileSync(outputPath, mergedPdfBytes);

    res.download(outputPath);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error merging PDFs");
  }
};


/* ---------------- ADD PAGE NUMBERS ---------------- */

exports.addPageNumbers = async (req, res) => {
  try {

    const pdfBytes = fs.readFileSync(req.file.path);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();

    pages.forEach((page, index) => {

      const { width } = page.getSize();
      const pageLabel = `Page ${index + 1}`;
      const fontSize = 16;
      const textWidth = font.widthOfTextAtSize(pageLabel, fontSize);

      page.drawText(pageLabel, {
        x: (width - textWidth) / 2,
        y: 40,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

    });

    const outputBytes = await pdfDoc.save();

    const outputPath = "outputs/page-numbered.pdf";

    fs.writeFileSync(outputPath, outputBytes);

    res.download(outputPath);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding page numbers");
  }
};

/* ---------------- PDF TO JPG ---------------- */

exports.pdfToJpg = async (req, res) => {
  let inputPdfPath = "";
  let zipPath = "";
  let convertedImages = [];

  try {
    if (!req.file) {
      return res.status(400).send("Please upload a PDF file");
    }

    inputPdfPath = req.file.path;

    const outputDir = path.resolve(__dirname, "../outputs");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const converter = fromPath(inputPdfPath, {
      density: 140,
      saveFilename: `page-${Date.now()}`,
      savePath: outputDir,
      format: "jpg",
      width: 1200,
      height: 1600
    });

    convertedImages = await converter.bulk(-1, { responseType: "image" });

    zipPath = path.join(outputDir, `pdf-to-jpg-${Date.now()}.zip`);

    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", resolve);
      archive.on("error", reject);

      archive.pipe(output);

      convertedImages.forEach((img, index) => {
        if (img.path && fs.existsSync(img.path)) {
          archive.file(img.path, { name: `page-${index + 1}.jpg` });
        }
      });

      archive.finalize();
    });

    return res.download(zipPath, "converted-images.zip", () => {
      try {
        if (inputPdfPath && fs.existsSync(inputPdfPath)) fs.unlinkSync(inputPdfPath);
      } catch (_) {}

      convertedImages.forEach((img) => {
        try {
          if (img.path && fs.existsSync(img.path)) fs.unlinkSync(img.path);
        } catch (_) {}
      });

      try {
        if (zipPath && fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      } catch (_) {}
    });

  } catch (error) {
    console.log(error);

    try {
      if (inputPdfPath && fs.existsSync(inputPdfPath)) fs.unlinkSync(inputPdfPath);
    } catch (_) {}

    convertedImages.forEach((img) => {
      try {
        if (img.path && fs.existsSync(img.path)) fs.unlinkSync(img.path);
      } catch (_) {}
    });

    try {
      if (zipPath && fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    } catch (_) {}

    return res.status(500).send("Error converting PDF to JPG");
  }
};

/* ---------------- JPG TO PDF ---------------- */

exports.jpgToPdf = async (req, res) => {
  const uploadedFiles = req.files || [];

  try {
    if (!uploadedFiles.length) {
      return res.status(400).send("Please upload JPG files");
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of uploadedFiles) {
      const imageBytes = fs.readFileSync(file.path);
      const lowerName = (file.originalname || "").toLowerCase();

      let image;

      if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg") || file.mimetype === "image/jpeg") {
        image = await pdfDoc.embedJpg(imageBytes);
      } else {
        continue;
      }

      const { width, height } = image.scale(1);
      const page = pdfDoc.addPage([width, height]);

      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height
      });
    }

    if (pdfDoc.getPageCount() === 0) {
      return res.status(400).send("No valid JPG images found");
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.resolve(__dirname, `../outputs/jpg-to-pdf-${Date.now()}.pdf`);

    fs.writeFileSync(outputPath, pdfBytes);

    return res.download(outputPath, "converted.pdf", () => {
      uploadedFiles.forEach((file) => {
        try {
          if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (_) {}
      });

      try {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);

    uploadedFiles.forEach((file) => {
      try {
        if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
      } catch (_) {}
    });

    return res.status(500).send("Error converting JPG to PDF");
  }
};