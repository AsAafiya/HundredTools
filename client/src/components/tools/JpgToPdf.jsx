import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbUpload } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import Features from "../common/Features";
import { convertJpgToPdf } from "../../services/pdfService";
import "../../styles/tool.css";
import "../../styles/fileUpload.css";

function JpgToPdf() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [complete, setComplete] = useState(false);

  const handlePick = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles);
    setMessage("");
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (files.length > 0 || complete) return;

    const droppedFiles = Array.from(event.dataTransfer.files || []).filter((file) =>
      /\.jpe?g$/i.test(file.name)
    );

    if (droppedFiles.length > 0) {
      setFiles(droppedFiles);
      setMessage("");
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setMessage("Please upload JPG images first.");
      return;
    }

    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);
      setMessage("");

      const blob = await convertJpgToPdf(files);

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setComplete(true);
      setMessage("Conversion successful.");
    } catch {
      setMessage("Conversion failed. Please try again.");
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
        <Link to="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </Link>
      </div>

      <h1>JPG to PDF</h1>
      <p className="subtitle">Convert one or more JPG images into a PDF</p>

      <div className="upload-container">
        <div className="upload-card">
          <div
            className={`upload-box ${complete ? "complete-state" : ""}`}
            onClick={() => {
              if (files.length === 0 && !complete && !loading) {
                inputRef.current.click();
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            {files.length === 0 && !complete && (
              <>
                <div className="upload-icon">
                  <TbUpload />
                </div>
                <h3>Upload JPG Files</h3>
                <p>Click to browse from your computer</p>
              </>
            )}

            {files.length > 0 && !complete && (
              <div className="upload-preview upload-preview-grid">
                {files.map((file, index) => (
                  <div className="upload-file-item" key={`${file.name}-${index}`}>
                    <span className="file-card-icon" aria-hidden="true">📄</span>
                    <div className="file-card-meta">
                      <p className="file-card-name">{file.name}</p>
                      <span className="file-card-size">{(file.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <button
                      className="remove-btn"
                      disabled={loading}
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {complete && (
              <div className="upload-preview">
                <p className="merged-file-name">converted.pdf</p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            multiple
            style={{ display: "none" }}
            onChange={handlePick}
          />

          {!complete && (
            <>
              <button
                className="upload-btn"
                onClick={() => inputRef.current.click()}
                disabled={files.length > 0 || loading}
              >
                Add File
              </button>

              <button
                type="button"
                className="upload-btn convert-btn"
                onClick={handleConvert}
                disabled={!files.length || loading}
              >
                {loading ? "Converting..." : "Convert File"}
              </button>
            </>
          )}

          {!complete && loading && (
            <div className="upload-progress-wrap" role="status" aria-live="polite">
              <div className="upload-progress-bar">
                <span className="upload-progress-fill" />
              </div>
              <p className="upload-progress-text">Converting JPG to PDF...</p>
            </div>
          )}

          {complete && downloadUrl && (
            <a href={downloadUrl} download="converted.pdf" className="upload-btn download-btn" onClick={handleDownload}>
              Download PDF
            </a>
          )}
        </div>
      </div>

      {message && <p className="subtitle">{message}</p>}

      <Features />
    </div>
  );
}

export default JpgToPdf;
