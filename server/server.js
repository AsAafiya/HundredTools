const express=require('express');
const multer=require('multer');
const cors= require('cors');
const fs=require('fs')
const {PDFDocument}=require("pdf-lib");
const app=express();

app.use(cors());

const upload = multer({
  dest:"uploads/",
  limits:{fileSize:50 * 1024 * 1024}
});

app.post("/merge",upload.array("pdfs"),async(req,res)=>{

  console.log("Route hit");
  console.log("files",req.files);
  try{
    const mergePdf=await PDFDocument.create();

    for(const file of req.files){

      const pdfBytes= fs.readFileSync(file.path);

      const pdf =await PDFDocument.load(pdfBytes);

      const pages=await mergePdf.copyPages(pdf,pdf.getPageIndices());

      pages.forEach((page)=>{
         mergePdf.addPage(page)
      }
       );
    }

    const mergedPdfBytes=await mergePdf.save();

    fs.writeFileSync("merged.pdf", mergedPdfBytes);

    res.download("merged.pdf");
  }catch(error){
    console.log(req.files)
    res.status(500).send("Error merging PDFs");
  }
});

app.listen(5000,()=>{
  console.log("Server running on port 5000")
});