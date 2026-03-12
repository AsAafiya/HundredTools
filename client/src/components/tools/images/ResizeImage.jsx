import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadImage from "../../common/FileUploadImage";
import { resizeImageAPI } from "../../../services/imageService";
import "../../../styles/tool.css";

function ResizeImage() {
  const [files, setFiles] = useState([]);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [downloadUrl, setDownloadUrl] = useState(null);
  const [processComplete, setProcessComplete] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleResize = async () => {
    if (!width || !height) {
      alert("Enter width and height");
      return;
    }

    try {
      const blob = await resizeImageAPI(files, width, height);

      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setProcessComplete(true);

      setFileName(
        files.length > 1 ? "Nexora_resizeImage.zip" : "Nexora_resizeImage.jpg",
      );
    } catch (err) {
      alert("Error resizing image");
    }
  };

  const resetTool = () => {
  setFiles([]);
  setDownloadUrl(null);
  setProcessComplete(false);
  setFileName("");

  // reset inputs
  setWidth("");
  setHeight("");
};

  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>Resize Image</h1>

      {/* Resize inputs */}
      <div className="resize-controls">
        <div className="resize-input">
          <label>Width (px)</label>
          <input
            type="number"
            placeholder="Enter width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <div className="resize-input">
          <label>Height (px)</label>
          <input
            type="number"
            placeholder="Enter height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <FileUploadImage
        accept="image/*"
        maxFiles={10}
        files={files}
        setFiles={setFiles}
        onProcess={handleResize}
        processComplete={processComplete}
        downloadUrl={downloadUrl}
        outputFileName={fileName}
        processLabel="Resize Images"
        successMessage="Resized successfully!!!"
        onReset={resetTool} 
      />
    </div>
  );
}

export default ResizeImage;
