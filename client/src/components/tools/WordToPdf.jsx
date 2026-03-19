import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import FileUploadSingle from "../common/FileUploadSingle";
import Features from "../common/Features";

import { wordToPdf } from "../../services/pdfService";

import "../../styles/tool.css";
import { useError } from "../../context/ErrorContext";

function WordToPdf() {

  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [convertComplete, setConvertComplete] = useState(false);
  const [fileName, setFileName] = useState("");
   const { showError } = useError();
  const handleConvert = async () => {

    if (!file) {
      showError("Upload a Word file first");
      return;
    }

    try {

      const result = await wordToPdf(file);

      const url = window.URL.createObjectURL(result);

      setDownloadUrl(url);
      setConvertComplete(true);
      setFileName(file.name.replace(/\.(doc|docx)$/i, ".pdf"));

    } catch (error) {

      console.error(error);
      showError("Conversion failed");

    }

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
      />

      <Features />

    </div>

  );
}

export default WordToPdf;