const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { PDFDocument, degrees } = require("pdf-lib");
const libre = require("libreoffice-convert");



// MERGE PDF
exports.mergePDF = async (req, res) => {

  try {

    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {

      const pdfBytes = fs.readFileSync(file.path);

      const pdf = await PDFDocument.load(pdfBytes);

      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      pages.forEach(page => mergedPdf.addPage(page));

    }

    const mergedPdfBytes = await mergedPdf.save();

    const outputPath = "outputs/merged.pdf";

    fs.writeFileSync(outputPath, mergedPdfBytes);

    res.download(outputPath);

  } catch (error) {

    console.error(error);
    res.status(500).send("Error merging PDFs");

  }

};


/* ---------------- PDF TO WORD ---------------- */
exports.pdfToWord = async (req, res) => {
  let inputPath = "";
  let outputPath = "";
  let requestOutputDir = "";

  try {

    if (!req.file) {
      return res.status(400).send("Please upload a PDF file");
    }

    const originalName = (req.file.originalname || "").toLowerCase();

    if (!originalName.endsWith(".pdf")) {
      return res.status(400).send("Only PDF files are supported");
    }

    inputPath = path.resolve(req.file.path);

    const outputDir = path.resolve(__dirname, "../outputs");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    requestOutputDir = path.join(
      outputDir,
      `pdf-to-word-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    );

    fs.mkdirSync(requestOutputDir, { recursive: true });

    await new Promise((resolve, reject) => {
      execFile(
      "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
      [
        "--headless",
        "--infilter=writer_pdf_import",
        "--convert-to",
        "docx",
        "--outdir",
        requestOutputDir,
        inputPath
      ],
        (error, stdout, stderr) => {

          if (error) {
            const err = new Error(stderr || stdout || "LibreOffice conversion failed");
            err.code = error.code;
            return reject(err);
          }

          resolve();
        }
      );
    });

    const generatedFiles = fs
      .readdirSync(requestOutputDir)
      .filter((fileName) => fileName.toLowerCase().endsWith(".docx"));

    const convertedPath =
      generatedFiles.length > 0
        ? path.join(requestOutputDir, generatedFiles[0])
        : "";

    if (!fs.existsSync(convertedPath)) {
      return res.status(500).send("Conversion failed: output Word file not found");
    }

    outputPath = path.join(outputDir, `pdf-to-word-${Date.now()}.docx`);

    fs.renameSync(convertedPath, outputPath);

    return res.download(outputPath, "converted.docx", () => {

      try {
        if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      } catch (_) {}

      try {
        if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      } catch (_) {}

      try {
        if (requestOutputDir && fs.existsSync(requestOutputDir)) {
          fs.rmSync(requestOutputDir, { recursive: true, force: true });
        }
      } catch (_) {}

    });

  } catch (error) {

    console.log(error);

    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    } catch (_) {}

    try {
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (_) {}

    try {
      if (requestOutputDir && fs.existsSync(requestOutputDir)) {
        fs.rmSync(requestOutputDir, { recursive: true, force: true });
      }
    } catch (_) {}

    if (error && error.message && error.message.includes("ENOENT")) {
      return res
        .status(500)
        .send("LibreOffice is not installed on server. Install it to use PDF to Word.");
    }

    return res.status(500).send("Error converting PDF to Word");
  }
};


// WORD → PDF
/* ---------------- WORD TO PDF ---------------- */

exports.wordToPdf = async (req, res) => {
  let inputPath = "";
  let outputPath = "";
  let requestOutputDir = "";

  try {
    if (!req.file) {
      return res.status(400).send("Please upload a Word file");
    }

    const originalName = (req.file.originalname || "").toLowerCase();
    const isDocx = originalName.endsWith(".docx");
    const isDoc = originalName.endsWith(".doc");

    if (!isDocx && !isDoc) {
      return res.status(400).send("Only .doc and .docx files are supported");
    }

    inputPath = path.resolve(req.file.path);

    const outputDir = path.resolve(__dirname, "../outputs");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    requestOutputDir = path.join(
      outputDir,
      `word-to-pdf-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    );
    fs.mkdirSync(requestOutputDir, { recursive: true });

    await new Promise((resolve, reject) => {
      execFile(
        "soffice",
        [
          "--headless",
          "--convert-to",
          "pdf",
          "--outdir",
          requestOutputDir,
          inputPath
        ],
        (error, stdout, stderr) => {
          if (error) {
            const err = new Error(stderr || stdout || "LibreOffice conversion failed");
            err.code = error.code;
            return reject(err);
          }

          resolve();
        }
      );
    });

    const generatedFiles = fs
      .readdirSync(requestOutputDir)
      .filter((fileName) => fileName.toLowerCase().endsWith(".pdf"));

    const convertedPath =
      generatedFiles.length > 0
        ? path.join(requestOutputDir, generatedFiles[0])
        : "";

    if (!fs.existsSync(convertedPath)) {
      return res.status(500).send("Conversion failed: output PDF not found");
    }

    outputPath = path.join(outputDir, `word-to-pdf-${Date.now()}.pdf`);
    fs.renameSync(convertedPath, outputPath);

    return res.download(outputPath, "converted.pdf", () => {
      try {
        if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      } catch (_) {}

      try {
        if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      } catch (_) {}

      try {
        if (requestOutputDir && fs.existsSync(requestOutputDir)) {
          fs.rmSync(requestOutputDir, { recursive: true, force: true });
        }
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);

    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    } catch (_) {}

    try {
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (_) {}

    try {
      if (requestOutputDir && fs.existsSync(requestOutputDir)) {
        fs.rmSync(requestOutputDir, { recursive: true, force: true });
      }
    } catch (_) {}

    if (error && error.message && error.message.includes("ENOENT")) {
      return res
        .status(500)
        .send("LibreOffice is not installed on server. Install it to use Word to PDF.");
    }

    return res.status(500).send("Error converting Word to PDF");
  }
};


// ADD WATERMARK
exports.addWatermark = async (req, res) => {

  try {

    const file = req.file;

    const watermarkText = req.body.text || "CONFIDENTIAL";

    const pdfBytes = fs.readFileSync(file.path);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();

    pages.forEach(page => {

    const { width, height } = page.getSize();

    const xStep = width / 4;
    const yStep = height / 4;

    for (let x = xStep / 2; x < width; x += xStep) {
        for (let y = yStep / 2; y < height; y += yStep) {

        page.drawText(watermarkText, {
            x: x,
            y: y,
            size: 30,
            opacity: 0.2,
            rotate: degrees(45)
        });

        }
    }

    });

    const newPdf = await pdfDoc.save();

    const outputPath = "outputs/watermarked.pdf";

    fs.writeFileSync(outputPath, newPdf);

    res.download(outputPath);

  } catch (error) {

    console.error(error);
    res.status(500).send("Watermark failed");

  }

};