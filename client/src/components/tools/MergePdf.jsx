import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadMultiple from "../common/FileUploadMultiple";
import Features from "../common/Features";
import { mergePDF } from "../../services/pdfService";
import "../../styles/tool.css";

function MergePdf() {

  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [mergeComplete, setMergeComplete] = useState(false);
  const [mergedFileName, setMergedFileName] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFiles([]);
    setDownloadUrl(null);
    setMergeComplete(false);
    setMergedFileName("");
    setLoading(false);
    setResetKey((k) => k + 1);
  };

  const handleMerge = async () => {

    if (files.length < 2) {
      alert("Upload at least 2 PDFs");
      return;
    }

    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);

      const mergedFile = await mergePDF(files);

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = window.URL.createObjectURL(mergedFile);

      setDownloadUrl(url);
      setMergeComplete(true);

      setMergedFileName("Nexora_merged.pdf"); 

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
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>Merge PDF</h1>

      <p className="subtitle">
        Combine multiple PDF files into a single document
      </p>

      <FileUploadMultiple
        key={resetKey}
        onFilesChange={setFiles}
        onMerge={handleMerge}
        downloadUrl={downloadUrl}
        mergeComplete={mergeComplete}
        mergedFileName={mergedFileName}
        processLabel="Merge PDF"
        downloadLabel="Download Merged PDF"
        onReset={handleReset}
        onDownload={handleDownload}
        isProcessing={loading}
        processingLabel="Merging your PDFs..."
      />

      <Features />

    </div>
  );
}

export default MergePdf;
