import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadSingle from "../common/FileUploadSingle";
import Features from "../common/Features";
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
        endpoint="/pdf/split"
        downloadName="split-pages.zip"
      />
      <Features />
    </div>
  );
}

export default SplitPdf;
