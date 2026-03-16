import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadImage from "../../common/FileUploadImage";
import Features from "../../common/Features";
import { compressImageAPI } from "../../../services/imageService";
import "../../../styles/tool.css";

function CompressImage() {
  const [processing, setProcessing] = useState(false);
  const [level, setLevel] = useState("medium");
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [compressComplete, setCompressComplete] = useState(false);

  const handleCompress = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    try {
      setProcessing(true);

      const compressedBlob = await compressImageAPI(files, level);
      const url = window.URL.createObjectURL(compressedBlob);

      setDownloadUrl(url);
      setCompressComplete(true);
    } catch (error) {
      console.error(error);
      alert("Error compressing images");
    } finally {
      setProcessing(false);
    }
  };

  const resetTool = () => {
    setFiles([]);
    setDownloadUrl(null);
    setCompressComplete(false);
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>Compress Image</h1>
      <p className="subtitle">
        Reduce image file size while maintaining quality
      </p>

      <div className="format-selector">
        <h3>Select Compression Level</h3>

        <div className="format-options">
          <button
            className={level === "high" ? "format-card active" : "format-card"}
            onClick={() => setLevel("high")}
          >
            <span>High</span>
            <p>Maximum compression</p>
          </button>

          <button
            className={level === "medium" ? "format-card active" : "format-card"}
            onClick={() => setLevel("medium")}
          >
            <span>Medium</span>
            <p>Balanced quality</p>
          </button>

          <button
            className={level === "low" ? "format-card active" : "format-card"}
            onClick={() => setLevel("low")}
          >
            <span>Low</span>
            <p>Best quality</p>
          </button>
        </div>
      </div>

      <FileUploadImage
        accept="image/*"
        maxFiles={10}
        files={files}
        setFiles={setFiles}
        onProcess={handleCompress}
        processComplete={compressComplete}
        downloadUrl={downloadUrl}
        outputFileName={
          files.length > 1
            ? "Nexora_compressImage.zip"
            : "Nexora_compressImage.jpg"
        }
        processLabel="Compress Images"
        successMessage="compressed successfully!!!"
        onReset={resetTool}
        processing={processing}
      />

      <Features />
    </div>
  );
}

export default CompressImage;