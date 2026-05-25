const fs = require("fs");
const path = require("path");
const { execFile, exec } = require("child_process");
const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const archiver = require("archiver");
const { fromPath } = require("pdf2pic");

const outputDir = path.resolve(__dirname, "../outputs");

const ensureOutputDir = () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
};

/* ---------------- MERGE PDF ---------------- */

exports.mergePDF = async (req, res) => {
  try {
    ensureOutputDir();

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("Please upload PDF files");
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);

      const pdf = await PDFDocument.load(pdfBytes);

      const pages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    const outputPath = path.join(
      outputDir,
      `merged-${Date.now()}.pdf`
    );

    fs.writeFileSync(outputPath, mergedPdfBytes);

    res.download(outputPath, () => {
      try {
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error merging PDFs");
  }
};

/* ---------------- ADD PAGE NUMBERS ---------------- */

exports.addPageNumbers = async (req, res) => {
  try {
    ensureOutputDir();

    if (!req.file) {
      return res.status(400).send("Please upload a PDF file");
    }

    const pdfBytes = fs.readFileSync(req.file.path);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const font = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    const pages = pdfDoc.getPages();

    const position =
      req.body.position || "bottom-center";

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();

      const text = `Page ${index + 1}`;

      const size = 16;

      const textWidth = font.widthOfTextAtSize(
        text,
        size
      );

      const isTop = position.startsWith("top");
      const isLeft = position.endsWith("left");
      const isRight = position.endsWith("right");

      const x = isLeft
        ? 20
        : isRight
        ? width - textWidth - 20
        : (width - textWidth) / 2;

      const y = isTop ? height - 30 : 20;

      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytesOut = await pdfDoc.save();

    const outputPath = path.join(
      outputDir,
      `page-numbered-${Date.now()}.pdf`
    );

    fs.writeFileSync(outputPath, pdfBytesOut);

    res.download(outputPath, () => {
      try {
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding page numbers");
  }
};

/* ---------------- PDF TO JPG ---------------- */

exports.pdfToJpg = async (req, res) => {
  try {
    ensureOutputDir();

    if (!req.file) {
      return res.status(400).send("Please upload a PDF");
    }

    const converter = fromPath(req.file.path, {
      density: 140,
      saveFilename: `page-${Date.now()}`,
      savePath: outputDir,
      format: "jpg",
      width: 1200,
      height: 1600,
    });

    const convertedImages = await converter.bulk(-1);

    const zipPath = path.join(
      outputDir,
      `pdf-to-jpg-${Date.now()}.zip`
    );

    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipPath);

      const archive = archiver("zip", {
        zlib: { level: 9 },
      });

      output.on("close", resolve);

      archive.on("error", reject);

      archive.pipe(output);

      convertedImages.forEach((img, index) => {
        archive.file(img.path, {
          name: `page-${index + 1}.jpg`,
        });
      });

      archive.finalize();
    });

    res.download(zipPath, () => {
      try {
        fs.unlinkSync(zipPath);
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting PDF to JPG");
  }
};

/* ---------------- JPG TO PDF ---------------- */

exports.jpgToPdf = async (req, res) => {
  try {
    ensureOutputDir();

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("Upload JPG files");
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const imageBytes = fs.readFileSync(file.path);

      const image = await pdfDoc.embedJpg(imageBytes);

      const { width, height } = image.scale(1);

      const page = pdfDoc.addPage([width, height]);

      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    const outputPath = path.join(
      outputDir,
      `jpg-to-pdf-${Date.now()}.pdf`
    );

    fs.writeFileSync(outputPath, pdfBytes);

    res.download(outputPath, () => {
      try {
        fs.unlinkSync(outputPath);
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting JPG to PDF");
  }
};

/* ---------------- PDF TO WORD ---------------- */

exports.pdfToWord = async (req, res) => {
  try {
    ensureOutputDir();

    if (!req.file) {
      return res.status(400).send("Upload PDF");
    }

    const inputPath = path.resolve(req.file.path);

    await new Promise((resolve, reject) => {
      execFile(
        "soffice",
        [
          "--headless",
          "--infilter=writer_pdf_import",
          "--convert-to",
          "docx",
          "--outdir",
          outputDir,
          inputPath,
        ],
        (error) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });

    const files = fs
      .readdirSync(outputDir)
      .filter((f) => f.endsWith(".docx"));

    const convertedPath = path.join(outputDir, files[0]);

    res.download(convertedPath, () => {
      try {
        fs.unlinkSync(convertedPath);
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting PDF to Word");
  }
};

/* ---------------- WORD TO PDF ---------------- */

exports.wordToPdf = async (req, res) => {
  try {
    ensureOutputDir();

    if (!req.file) {
      return res.status(400).send("Upload Word file");
    }

    const inputPath = path.resolve(req.file.path);

    await new Promise((resolve, reject) => {
      execFile(
        "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
        [
          "--headless",
          "--convert-to",
          "pdf",
          "--outdir",
          outputDir,
          inputPath,
        ],
        (error) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });

    const files = fs
      .readdirSync(outputDir)
      .filter((f) => f.endsWith(".pdf"));

    const convertedPath = path.join(outputDir, files[0]);

    res.download(convertedPath, () => {
      try {
        fs.unlinkSync(convertedPath);
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting Word to PDF");
  }
};

/* ---------------- ADD WATERMARK ---------------- */

exports.addWatermark = async (req, res) => {
  try {
    ensureOutputDir();

    if (!req.file) {
      return res.status(400).send("Upload PDF");
    }

    const pdfBytes = fs.readFileSync(req.file.path);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();

    const watermark =
      req.body.text || "CONFIDENTIAL";

    pages.forEach((page) => {
      const { width, height } = page.getSize();

      page.drawText(watermark, {
        x: width / 3,
        y: height / 2,
        size: 40,
        opacity: 0.2,
        rotate: degrees(45),
      });
    });

    const newPdf = await pdfDoc.save();

    const outputPath = path.join(
      outputDir,
      `watermarked-${Date.now()}.pdf`
    );

    fs.writeFileSync(outputPath, newPdf);

    res.download(outputPath, () => {
      try {
        fs.unlinkSync(outputPath);
      } catch (_) {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Watermark failed");
  }
};


/* ---------------- SPLIT PDF ---------------- */

exports.splitPDF = async (req, res) => {
  try {
    console.log("split route hit");

    if (!req.file) {
      return res.status(400).send("No PDF uploaded");
    }

    ensureOutputDir();

    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const zipPath = path.join(outputDir, `split-${Date.now()}.zip`);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    const output = fs.createWriteStream(zipPath);

    archive.pipe(output);

    const totalPages = pdfDoc.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();

      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);

      newPdf.addPage(copiedPage);

      const pageBytes = await newPdf.save();

      const tempPath = path.join(outputDir, `page-${i + 1}.pdf`);

      fs.writeFileSync(tempPath, pageBytes);

      archive.file(tempPath, {
        name: `page-${i + 1}.pdf`,
      });
    }

    await archive.finalize();

    output.on("close", () => {
      res.download(zipPath, "split-pdf.zip", () => {
        try {
          fs.unlinkSync(zipPath);
        } catch (_) {}
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error splitting PDF");
  }
};


/* ---------------- COMPRESS PDF ---------------- */

exports.compressPDF = async (req, res) => {
  try {
    console.log("compress route hit");

    if (!req.file) {
      return res.status(400).send("No PDF uploaded");
    }

    ensureOutputDir();

    const inputPath = path.resolve(req.file.path);

    const outputPath = path.join(
      outputDir,
      `compressed-${Date.now()}.pdf`
    );

    const gsCommand =
      process.platform === "win32"
        ? "gswin64c"
        : "gs";

    execFile(
      gsCommand,
      [
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=/screen",
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        `-sOutputFile=${outputPath}`,
        inputPath,
      ],
      (error) => {
        if (error) {
          console.log("Ghostscript Error:", error);
          return res.status(500).send("Compression failed");
        }

        res.download(outputPath, "compressed.pdf", (err) => {
          if (err) {
            console.log(err);
          }

          try {
            if (fs.existsSync(outputPath)) {
              fs.unlinkSync(outputPath);
            }

            if (fs.existsSync(inputPath)) {
              fs.unlinkSync(inputPath);
            }
          } catch (cleanupError) {
            console.log(cleanupError);
          }
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Compression error");
  }
};