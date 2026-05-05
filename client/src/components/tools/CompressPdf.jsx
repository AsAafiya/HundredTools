import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadMultiple from "../common/FileUploadMultiple";
import Features from "../common/Features";
import { compressPDFWithProgress } from "../../services/pdfService";
import "../../styles/tool.css";
import { useError } from "../../context/ErrorContext";

function CompressPdf() {
  const { showError } = useError();
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [mergeComplete, setMergeComplete] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleReset = () => {
    setFiles([]);
    setDownloadUrl(null);
    setMergeComplete(false);
    setLoading(false);
    setResetKey((k) => k + 1);
  };

  const handleCompress = async () => {
    if (!files || files.length === 0) {
      showError("Please upload a PDF file to compress.");
      return;
    }

    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);
      const blob = await compressPDFWithProgress(files[0], (p) => setUploadProgress(p));

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMergeComplete(true);
    } catch (error) {
      console.error(error);
      showError("Compression failed. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
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
        uploadProgress={uploadProgress}
        processingLabel="Compressing your PDF..."
      />

      <Features />
    </div>
  );
}

export default CompressPdf;
