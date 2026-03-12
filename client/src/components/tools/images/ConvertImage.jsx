import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadImage from "../../common/FileUploadImage";
import Features from "../../common/Features";
import { convertImageAPI } from "../../../services/imageService";
import "../../../styles/tool.css";

function ConvertImage() {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("png");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [processComplete, setProcessComplete] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleConvert = async () => {
    if (files.length === 0) {
      alert("Upload at least one image");
      return;
    }

    try {
      const blob = await convertImageAPI(files, format);

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setProcessComplete(true);

      setFileName(
        files.length > 1
          ? "Nexora_convertImage.zip"
          : `Nexora_convertImage.${format}`,
      );
    } catch (error) {
      console.error(error);
      alert("Error converting image");
    }
  };

  const resetTool = () => {
    setFiles([]);
    setDownloadUrl(null);
    setProcessComplete(false);
    setFileName("");
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>Convert Image</h1>
      <p className="subtitle">Convert images to JPG, PNG, or WEBP format</p>

      {/* Format selector */}

      <div className="format-selector">
        <h3>Select Output Format</h3>

        <div className="format-options">
          <button
            className={format === "jpg" ? "format-card active" : "format-card"}
            onClick={() => setFormat("jpg")}
          >
            <span>JPG</span>
            <p>Best for photos</p>
          </button>

          <button
            className={format === "png" ? "format-card active" : "format-card"}
            onClick={() => setFormat("png")}
          >
            <span>PNG</span>
            <p>Best for transparency</p>
          </button>

          <button
            className={format === "webp" ? "format-card active" : "format-card"}
            onClick={() => setFormat("webp")}
          >
            <span>WEBP</span>
            <p>Best for web performance</p>
          </button>
        </div>
      </div>

      <FileUploadImage
        accept="image/*"
        maxFiles={10}
        files={files}
        setFiles={setFiles}
        onProcess={handleConvert}
        processComplete={processComplete}
        downloadUrl={downloadUrl}
        outputFileName={fileName}
        processLabel="Convert Images"
        successMessage="converted successfully!!!"
        onReset={resetTool}
      />

      <Features />
    </div>
  );
}

export default ConvertImage;
