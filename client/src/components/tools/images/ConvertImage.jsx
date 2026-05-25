import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadImage from "../../common/FileUploadImage";
import Features from "../../common/Features";
import { convertImageAPI } from "../../../services/imageService";
import "../../../styles/tool.css";
import { useError } from "../../../context/ErrorContext";

function ConvertImage() {
  const [svgAllowed, setSvgAllowed] = useState(true);
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("png");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [processComplete, setProcessComplete] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

    const { showError } = useError();
  const handleConvert = async () => {
    if (files.length === 0) {
      showError("Upload at least one image");
      return;
    }

    try {
      const blob = await convertImageAPI(files, format, (p) => setUploadProgress(p));

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
     showError("Error converting image");
    }
  };

  const resetTool = () => {
    setFiles([]);
    setDownloadUrl(null);
    setProcessComplete(false);
    setFileName("");
  };

  const handleFilesChange = (uploadedFiles) => {
    setFiles(uploadedFiles);

    const allSVG = uploadedFiles.every((file) =>
      file.name.toLowerCase().endsWith(".svg"),
    );

    setSvgAllowed(allSVG);
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>Convert Image</h1>
      <p className="subtitle">Convert images to JPG, PNG, SVG or WEBP format</p>

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

          <button
            disabled={!svgAllowed}
            className={
              format === "svg"
                ? "format-card active"
                : !svgAllowed
                  ? "format-card disabled"
                  : "format-card"
            }
            onClick={() => setFormat("svg")}
          >
            <span>SVG</span>
            <p>Vector format</p>
          </button>
        </div>
      </div>

      <FileUploadImage
        accept="image/*,.svg"
        maxFiles={10}
        files={files}
        setFiles={handleFilesChange}
        onProcess={handleConvert}
        processComplete={processComplete}
        downloadUrl={downloadUrl}
        outputFileName={fileName}
        processLabel="Convert Images"
        successMessage="converted successfully!!!"
        onReset={resetTool}
        processing={processComplete ? false : uploadProgress > 0}
        uploadProgress={uploadProgress}
      />

      <Features />
    </div>
  );
}

export default ConvertImage;
