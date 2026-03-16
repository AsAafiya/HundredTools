import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadImage from "../../common/FileUploadImage";
import Features from "../../common/Features";
import { compressImageAPI } from "../../../services/imageService";
import "../../../styles/tool.css";

function CompressImage() {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [compressComplete, setCompressComplete] = useState(false);
  const [compressedFileName, setCompressedFileName] = useState("");

  const handleCompress = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    try {
      // send all files
      const compressedBlob = await compressImageAPI(files);
      const url = window.URL.createObjectURL(compressedBlob);

      setDownloadUrl(url);
      setCompressComplete(true);

      // if multiple files, use zip name
      setCompressedFileName(
        files.length > 1
          ? "Nexora_compressImage.zip"
          : "Nexora_compressImage.jpg",
      );
    } catch (error) {
      console.error(error);
      alert("Error compressing images");
    }
  };

  const resetTool = () => {
    setFiles([]);
    setDownloadUrl(null);
    setCompressComplete(false);
    setCompressedFileName("");
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
        successMessage="compressed successfully!!!"
        onReset={resetTool}
      />

      <Features />
    </div>
  );
}

export default CompressImage;
