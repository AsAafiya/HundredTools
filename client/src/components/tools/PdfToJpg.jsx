import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import FileUploadSingle2 from "../common/FileUploadSingle2";
import Features from "../common/Features";
import { convertPdfToJpg } from "../../services/pdfService";
import "../../styles/tool.css";
import { useError } from "../../context/ErrorContext";

function PdfToJpg() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
   const { showError } = useError();
  const handleConvert = async () => {
    if (!selectedFile) {
      showError("Please upload a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const blob = await convertPdfToJpg(selectedFile);

      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "converted-images.zip";
      a.click();
      URL.revokeObjectURL(downloadUrl);

      showError("Conversion successful. Download started.");
    } catch {
      showError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

      <FileUploadSingle2 accept=".pdf" onFileChange={setSelectedFile} />

      <button className="upload-btn" onClick={handleConvert} disabled={loading}>
        {loading ? "Converting..." : "Convert to JPG"}
      </button>

      {message && <p className="subtitle">{message}</p>}

      <Features />
    </div>
  );
}

export default PdfToJpg;
