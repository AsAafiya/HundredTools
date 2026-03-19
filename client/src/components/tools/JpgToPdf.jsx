import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import FileUploadMultiple from "../common/FileUploadMultiple";
import Features from "../common/Features";
import { convertJpgToPdf } from "../../services/pdfService";
import "../../styles/tool.css";
import { useError } from "../../context/ErrorContext";

function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [complete, setComplete] = useState(false);

  const handleReset = () => {
    setFiles([]);
    setLoading(false);
    setMessage("");
    setDownloadUrl("");
    setComplete(false);
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      showError("Please upload JPG images first.");
      return;
    }

    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);
      setMessage("");

      const blob = await convertJpgToPdf(files);

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setComplete(true);
      setMessage("Conversion successful.");
    } catch {
      showError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setTimeout(() => {
      handleReset();
    }, 300);
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <Link to="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </Link>
      </div>

      <h1>JPG to PDF</h1>
      <p className="subtitle">Convert one or more JPG images into a PDF</p>

      <FileUploadMultiple
        accept=".jpg,.jpeg,image/jpeg"
        onFilesChange={setFiles}
        onMerge={handleConvert}
        downloadUrl={downloadUrl}
        mergeComplete={complete}
        mergedFileName="converted.pdf"
        processLabel="Convert File"
        downloadLabel="Download PDF"
        onDownload={handleDownload}
        isProcessing={loading}
        processingLabel="Converting JPG to PDF..."
        minFilesForProcess={1}
      />

      {message && <p className="subtitle">{message}</p>}

      <Features />
    </div>
  );
}

export default JpgToPdf;
