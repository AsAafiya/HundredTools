const fs = require("fs");
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

// exports.pdfToJpg = async (req, res) => {
//   try {

//     const pdfPath = req.file.path;

//     const convert = fromPath(pdfPath, {
//       density: 100,
//       saveFilename: "page",
//       savePath: "./outputs",
//       format: "jpg",
//       width: 1000,
//       height: 1400
//     });

//     const page1 = await convert(1);

//     res.download(page1.path);

//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error converting PDF");
//   }
// };