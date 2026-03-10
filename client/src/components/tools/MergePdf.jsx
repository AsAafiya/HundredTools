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

  const handleMerge = async () => {

    if (files.length < 2) {
      alert("Upload at least 2 PDFs");
      return;
    }

    try {

      const mergedFile = await mergePDF(files);

      const url = window.URL.createObjectURL(mergedFile);

      setDownloadUrl(url);
      setMergeComplete(true);

      setMergedFileName("Nexora_merged.pdf"); 

    } catch (error) {
      console.error(error);
    }

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
        onFilesChange={setFiles}
        onMerge={handleMerge}
        downloadUrl={downloadUrl}
        mergeComplete={mergeComplete}
        mergedFileName={mergedFileName}
      />

      <Features />

    </div>
  );
}

export default MergePdf;
