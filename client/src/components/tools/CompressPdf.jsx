import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadSingle from "../common/FileUploadSingle";
import Features from "../common/Features";
import { compressPDF } from "../../services/pdfService";
import "../../styles/tool.css";

function CompressPdf() {
  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </a>
      </div>

      <h1>Compress Pdf</h1>

      <p className="subtitle">
        Reduce PDF file size while maintaining quality
      </p>

      <FileUploadSingle
  endpoint="/api/pdf/compress"
  downloadName="compressed.pdf"
/>

      <Features />
    </div>
  );
}

export default CompressPdf;