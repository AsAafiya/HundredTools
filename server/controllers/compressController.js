// ----------------------------------CompressTool------------------------------------------

const { exec } = require("child_process");

exports.compressPDF = (req, res) => {

    console.log("compress route hit");

    const inputPath = req.file.path;

    const outputPath = path.join("uploads", "compressed.pdf");

    const command = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;

    exec(command, (error) => {

        if (error) {
            console.log(error);
            return res.status(500).send("Compression failed");
        }

        res.download(outputPath);

    });

};