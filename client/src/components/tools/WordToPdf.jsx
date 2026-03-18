import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import FileUploadSingle from "../common/FileUploadSingle";
import Features from "../common/Features";

import "../../styles/tool.css";

function WordToPdf() {

  const handleDownload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (

    <div className="tool-page">

      <div className="back-btn">
        <Link to="/">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <h1>Word to PDF</h1>

      <p className="subtitle">
        Convert Word documents into PDF files
      </p>

      <FileUploadSingle
        accept=".doc,.docx"
        endpoint="/api/pdf/word-to-pdf"
        downloadName="converted.pdf"
        onDownload={handleDownload}
      />

      <Features />

    </div>

  );
}

export default WordToPdf;