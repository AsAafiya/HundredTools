// ============================================================================================================
//----------------------------------- SPLIT TOOL---------------------------------------------------------------


// const { PDFDocument } = require("pdf-lib");
// const fs = require("fs");
const path = require("path");

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

            const outputPath = path.join("uploads",` page-${i + 1}.pdf`);

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

splitFiles.forEach(file => {
  archive.file(file, { name: path.basename(file) });
});

archive.finalize();

    } catch (error) {

        console.log(error);

        res.status(500).json({ error: "Split failed" });

    }

};