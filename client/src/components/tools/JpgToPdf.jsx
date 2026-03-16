import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Features from "../common/Features";
import { convertJpgToPdf } from "../../services/pdfService";
import "../../styles/tool.css";

function JpgToPdf() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePick = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
    setMessage("");
    event.target.value = "";
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setMessage("Please upload JPG images first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const blob = await convertJpgToPdf(files);

      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "converted.pdf";
      a.click();
      URL.revokeObjectURL(downloadUrl);

      setMessage("Conversion successful. Download started.");
    } catch {
      setMessage("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <Link to="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </Link>
      </div>

      <h1>JPG to PDF</h1>
      <p className="subtitle">Convert one or more JPG images into a PDF</p>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,image/jpeg"
        multiple
        style={{ display: "none" }}
        onChange={handlePick}
      />

      <button className="upload-btn" onClick={() => inputRef.current.click()}>
        Add JPG Files
      </button>

      {files.length > 0 && (
        <p className="subtitle">{files.length} file(s) selected</p>
      )}

      <button className="upload-btn" onClick={handleConvert} disabled={loading}>
        {loading ? "Converting..." : "Convert to PDF"}
      </button>

      {message && <p className="subtitle">{message}</p>}

      <Features />
    </div>
  );
}

export default JpgToPdf;
