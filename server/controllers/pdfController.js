const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const archiver = require("archiver");
const { fromPath } = require("pdf2pic");
const { exec } = require("child_process");

/* ---------------- MERGE PDF ---------------- */

exports.mergePDF = async (req, res) => {
  try {
    console.log("merge route hit");

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
    console.log("add page numbers route hit");

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
    });
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
    console.log("pdf to jpg route hit");

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
      height: 1600,
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
        if (inputPdfPath && fs.existsSync(inputPdfPath))
          fs.unlinkSync(inputPdfPath);
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
      if (inputPdfPath && fs.existsSync(inputPdfPath))
        fs.unlinkSync(inputPdfPath);
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
    console.log("jpg to pdf route hit");

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
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting JPG to PDF");
  }
};

/* ---------------- PDF TO WORD ---------------- */

exports.pdfToWord = async (req, res) => {
  try {
    console.log("pdf to word route hit");

    const inputPath = path.resolve(req.file.path);

    const outputDir = path.resolve(__dirname, "../outputs");

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    await new Promise((resolve, reject) => {
      execFile(
        "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
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
        },
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting PDF to Word");
  }
};

/* ---------------- WORD TO PDF ---------------- */

exports.wordToPdf = async (req, res) => {
  try {
    console.log("word to pdf route hit");

    const inputPath = path.resolve(req.file.path);

    const outputDir = path.resolve(__dirname, "../outputs");

    await new Promise((resolve, reject) => {
      execFile(
        "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
        ["--headless", "--convert-to", "pdf", "--outdir", outputDir, inputPath],
        (error) => {
          if (error) return reject(error);
          resolve();
        },
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error converting Word to PDF");
  }
};

/* ---------------- ADD WATERMARK ---------------- */

exports.addWatermark = async (req, res) => {
  try {
    console.log("add watermark route hit");

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

    const pdfPath = req.file.path;

    const pdfBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const totalPages = pdfDoc.getPageCount();

    const splitFiles = [];

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();

      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);

      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();

      const outputPath = path.join("uploads", `page-${i + 1}.pdf`);

      fs.writeFileSync(outputPath, pdfBytes);

      splitFiles.push(outputPath);
    }

    // res.json({
    //     message: "PDF split successfully",
    //     files: splitFiles
    // });
    // res.download(splitFiles[0]);
    // res.download(path.resolve(splitFiles[0]))
    const archive = archiver("zip");

    res.attachment("split.zip");

    archive.pipe(res);

    splitFiles.forEach((file) => {
      archive.file(file, { name: path.basename(file) });
    });

    archive.finalize();
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Split failed" });
  }
};
/* ---------------- COMPRESS PDF ---------------- */

exports.compressPDF = async (req, res) => {
  try {
    console.log("compress route hit");

    const inputPath = path.resolve(req.file.path); // absolute path
    const outputPath = path.resolve("uploads", `compressed-${Date.now()}.pdf`);

    const command = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

    exec(command, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Compression failed");
      }

      res.download(outputPath, (err) => {
        if (err) {
          console.error("Download interrupted:", err.message);
        }

        try {
          if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
          }
        } catch (e) {
          console.error("Cleanup error:", e.message);
        }
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("Compression error");
  }
};
