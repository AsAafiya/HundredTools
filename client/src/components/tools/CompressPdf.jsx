import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadMultiple from "../common/FileUploadMultiple";
import Features from "../common/Features";
import { compressPDF } from "../../services/pdfService";
import "../../styles/tool.css";

function CompressPdf() {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [mergeComplete, setMergeComplete] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFiles([]);
    setDownloadUrl(null);
    setMergeComplete(false);
    setLoading(false);
    setResetKey((k) => k + 1);
  };

  const handleCompress = async () => {
    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);
      const blob = await compressPDF(files[0]);

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMergeComplete(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </a>
      </div>

      <h1>Compress PDF</h1>

      <p className="subtitle">Reduce PDF file size while maintaining quality</p>

      <FileUploadMultiple
        key={resetKey}
        accept=".pdf"
        onFilesChange={setFiles}
        onMerge={handleCompress}
        downloadUrl={downloadUrl}
        mergeComplete={mergeComplete}
        processLabel="Compress PDF"
        downloadLabel="Download Compressed PDF"
        onReset={handleReset}
        onDownload={handleDownload}
        isProcessing={loading}
        processingLabel="Compressing your PDF..."
      />

      <Features />
    </div>
  );
}

export default CompressPdf;
