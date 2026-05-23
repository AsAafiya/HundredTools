import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadSingle from "../common/FileUploadSingle";
import Features from "../common/Features";
import { splitPDF } from "../../services/pdfService";
import "../../styles/tool.css";

function SplitPdf() {
  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </a>
      </div>

      <h1>Split Pdf</h1>

      <p className="subtitle">
        Extract specific pages or split PDF into multiple files
      </p>

     <FileUploadSingle
  endpoint="/api/pdf/split"
  downloadName="split-pdf.zip"
/>

      <Features />
    </div>
  );
}

export default SplitPdf;