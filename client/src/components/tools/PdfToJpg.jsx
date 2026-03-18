import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import FileUploadSingle2 from "../common/FileUploadSingle2";
import Features from "../common/Features";
import { convertPdfToJpg } from "../../services/pdfService";
import "../../styles/tool.css";

function PdfToJpg() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [complete, setComplete] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleConvert = async () => {
    if (!selectedFile) {
      setMessage("Please upload a PDF file first.");
      return;
    }

    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);
      setMessage("");

      const blob = await convertPdfToJpg(selectedFile);

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setComplete(true);
      setMessage("Conversion successful.");
    } catch {
      setMessage("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setTimeout(() => {
      setSelectedFile(null);
      setDownloadUrl("");
      setComplete(false);
      setMessage("");
      setLoading(false);
      setResetKey((k) => k + 1);
    }, 300);
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <Link to="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </Link>
      </div>

      <h1>PDF to JPG</h1>
      <p className="subtitle">Convert PDF pages to high-quality JPG images</p>

      <FileUploadSingle2
        key={resetKey}
        accept=".pdf"
        onFileChange={setSelectedFile}
        onAction={handleConvert}
        actionLabel="Convert File"
        actionLoadingLabel="Converting..."
        actionLoading={loading}
        actionDisabled={!selectedFile || loading}
        complete={complete}
        completedFileName="converted-images.zip"
        completedDownloadUrl={downloadUrl}
        downloadLabel="Download ZIP"
        onDownload={handleDownload}
      />

      {message && <p className="subtitle">{message}</p>}

      <Features />
    </div>
  );
}

export default PdfToJpg;
