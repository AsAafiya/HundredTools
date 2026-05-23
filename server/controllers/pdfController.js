const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const archiver = require("archiver");
const { fromPath } = require("pdf2pic");

/* ---------------- MERGE PDF ---------------- */

exports.mergePDF = async (req, res) => {
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

    res.download(outputPath, (err) => {
  if (err) {
    console.error("Download interrupted:", err.message);
  }

  try {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  } catch (e) {
    console.error("File cleanup error:", e.message);
  }
});
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

      const text = `Page ${index + 1}`;
      const size = 16;

      const textWidth = font.widthOfTextAtSize(text, size);

      page.drawText(text, {
        x: (width - textWidth) / 2,
        y: 40,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytesOut = await pdfDoc.save();

    const outputPath = "outputs/page-numbered.pdf";

    fs.writeFileSync(outputPath, pdfBytesOut);

res.download(outputPath, (err) => {
  if (err) {
    console.error("Download interrupted:", err.message);
  }

  try {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  } catch (e) {
    console.error("File cleanup error:", e.message);
  }
});  } catch (error) {
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
      return res.status(400).send("Upload JPG files");
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of uploadedFiles) {
      const imageBytes = fs.readFileSync(file.path);
      const lowerName = (file.originalname || "").toLowerCase();

      let image;

      if (
        lowerName.endsWith(".jpg") ||
        lowerName.endsWith(".jpeg") ||
        file.mimetype === "image/jpeg"
      ) {
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
        height,
      });
    }

    if (pdfDoc.getPageCount() === 0) {
      return res.status(400).send("No valid JPG images found");
    }

    const pdfBytes = await pdfDoc.save();

    const outputPath = `outputs/jpg-to-pdf-${Date.now()}.pdf`;

    fs.writeFileSync(outputPath, pdfBytes);

res.download(outputPath, (err) => {
  if (err) {
    console.error("Download interrupted:", err.message);
  }

  try {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  } catch (e) {
    console.error("File cleanup error:", e.message);
  }
});  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting JPG to PDF");
  }
};

/* ---------------- PDF TO WORD ---------------- */

exports.pdfToWord = async (req, res) => {
  try {
    const inputPath = path.resolve(req.file.path);

    const outputDir = path.resolve(__dirname, "../outputs");

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

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
        inputPath
      ],
        (error) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });

    const files = fs.readdirSync(outputDir).filter((f) => f.endsWith(".docx"));

    const convertedPath = path.join(outputDir, files[0]);

    res.download(convertedPath, (err) => {
      if (err) {
        console.error("Download interrupted:", err.message);
      }

      try {
        if (fs.existsSync(convertedPath)) {
          fs.unlinkSync(convertedPath);
        }
      } catch (e) {
        console.error("File cleanup error:", e.message);
      }
    });  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting PDF to Word");
  }
};

/* ---------------- WORD TO PDF ---------------- */

exports.wordToPdf = async (req, res) => {
  try {
    const inputPath = path.resolve(req.file.path);

    const outputDir = path.resolve(__dirname, "../outputs");

    await new Promise((resolve, reject) => {
      execFile(
        "soffice",
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

    const files = fs.readdirSync(outputDir).filter((f) => f.endsWith(".pdf"));

    const convertedPath = path.join(outputDir, files[0]);

    res.download(convertedPath, (err) => {
      if (err) {
        console.error("Download interrupted:", err.message);
      }

      try {
        if (fs.existsSync(convertedPath)) {
          fs.unlinkSync(convertedPath);
        }
      } catch (e) {
        console.error("File cleanup error:", e.message);
      }
    });  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting Word to PDF");
  }
};

/* ---------------- ADD WATERMARK ---------------- */

exports.addWatermark = async (req, res) => {
  try {
    const pdfBytes = fs.readFileSync(req.file.path);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();

    const watermark = req.body.text || "CONFIDENTIAL";

    pages.forEach((page) => {
      const { width, height } = page.getSize();

      const xStep = width / 4;
      const yStep = height / 4;

      for (let x = xStep / 2; x < width; x += xStep) {
        for (let y = yStep / 2; y < height; y += yStep) {
          page.drawText(watermark, {
            x,
            y,
            size: 30,
            opacity: 0.2,
            rotate: degrees(45),
          });
        }
      }
    });

    const newPdf = await pdfDoc.save();

    const outputPath = "outputs/watermarked.pdf";

    fs.writeFileSync(outputPath, newPdf);

res.download(outputPath, (err) => {
  if (err) {
    console.error("Download interrupted:", err.message);
  }

  try {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  } catch (e) {
    console.error("File cleanup error:", e.message);
  }
});  } catch (error) {
    console.log(error);
    res.status(500).send("Watermark failed");
  }
};

exports.splitPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No PDF uploaded");
    }

    const pdfBytes = fs.readFileSync(req.file.path);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const outputDir = path.resolve(__dirname, "../outputs");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

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

      const pdfBytes = await newPdf.save();

      const tempPath = path.join(outputDir, `page-${i + 1}.pdf`);

      fs.writeFileSync(tempPath, pdfBytes);

      archive.file(tempPath, { name: `page-${i + 1}.pdf` });
    }

    archive.finalize();

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

exports.compressPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No PDF uploaded");
    }

    const inputPath = req.file.path;

    const outputPath = path.join(
      "outputs",
      `compressed-${Date.now()}.pdf`
    );

    execFile(
      "gs",
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
          console.log(error);
          return res.status(500).send("Compression failed");
        }

        res.download(outputPath, () => {
          try {
            fs.unlinkSync(outputPath);
          } catch (_) {}
        });
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send("Error compressing PDF");
  }
};
