import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadImage from "../../common/FileUploadImage";
import Features from "../../common/Features";
import { compressImageAPI } from "../../../services/imageService";
import "../../../styles/tool.css";
import { useError } from "../../../context/ErrorContext";

function CompressImage() {
  const { showError } = useError();

  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [compressComplete, setCompressComplete] = useState(false);
  const [compressedFileName, setCompressedFileName] = useState("");
  const [quality, setQuality] = useState("medium"); // default medium


  // Handle Compression
  const handleCompress = async () => {
    if (files.length === 0) {
      showError("Please upload at least one image!");
      return;
    }

    try {
      // Compress images with selected quality
      const compressedBlob = await compressImageAPI(files, quality);
      const url = window.URL.createObjectURL(compressedBlob);

      setDownloadUrl(url);
      setCompressComplete(true);

      // Set file name based on single/multiple files
      // if multiple files, use zip name
      setCompressedFileName(
        files.length > 1
          ? "Nexora_compressImage.zip"
          : "Nexora_compressImage.jpg",
      );
    } catch (error) {
      console.error(error);
    showError("Error compressing images. Please try again.");
    }
  };

  // Reset tool
  const resetTool = () => {
    setFiles([]);
    setDownloadUrl(null);
    setCompressComplete(false);
    setCompressedFileName("");
    setQuality("medium");
  };

  return (
    <div className="tool-page">
      {/* Back button */}
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
            className={
              quality === "high" ? "format-card active" : "format-card"
            }
            onClick={() => setQuality("high")}
          >
            <span>High</span>
            <p>Maximum compression</p>
          </button>

          <button
            className={
              quality === "medium" ? "format-card active" : "format-card"
            }
            onClick={() => setQuality("medium")}
          >
            <span>Medium</span>
            <p>Balanced quality</p>
          </button>

          <button
            className={quality === "low" ? "format-card active" : "format-card"}
            onClick={() => setQuality("low")}
          >
            <span>Low</span>
            <p>Best image quality</p>
          </button>
        </div>
      </div>

      {/* File Upload Component */}
      <FileUploadImage
        accept="image/*"
        maxFiles={10} // allow multiple files
        files={files}
        setFiles={setFiles}
        onProcess={handleCompress}
        processComplete={compressComplete}
        downloadUrl={downloadUrl}
        outputFileName={compressedFileName}
        processLabel="Compress Images"
        successMessage="Images compressed successfully!"
        onReset={resetTool}
      />

      <Features />
    </div>
  );
}

export default CompressImage;
