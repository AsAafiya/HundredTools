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

  const handleCompress = async () => {
    try {
      const blob = await compressPDF(files[0]);

      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMergeComplete(true);
    } catch (error) {
      console.error(error);
    }
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
        accept=".pdf"
        onFilesChange={setFiles}
        onMerge={handleCompress}
        downloadUrl={downloadUrl}
        mergeComplete={mergeComplete}
        processLabel="Compress PDF" 
        downloadLabel="Download Compressed PDF" 
      />

      <Features />
    </div>
  );
}

export default CompressPdf;
