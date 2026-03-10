const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

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