import { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import "../../styles/fileUpload.css";

function FileUploadSingle({
  accept = ".pdf",
  maxSizeMB = 50,
  endpoint = "",
  downloadName = "converted-file",
  onDownload
}) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [convertComplete, setConvertComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (selectedFile) => {
    const errorList = [];

    const allowedTypes = accept.split(",");

    const isValidType = allowedTypes.some((type) =>
      selectedFile.name.toLowerCase().endsWith(type.trim())
    );

    if (!isValidType) {
      errorList.push(`${selectedFile.name} → Invalid file type`);
    }

    if (selectedFile.size > maxSizeBytes) {
      errorList.push(`${selectedFile.name} → File exceeds ${maxSizeMB}MB`);
    }

    setErrors(errorList);

    if (errorList.length > 0) return null;

    return selectedFile;
  };

  const handleFile = (selectedFiles) => {
    const selectedFile = selectedFiles[0];

    if (!selectedFile) return;

    const validated = validateFile(selectedFile);

    if (validated) {
      setFile(validated);
      setErrors([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (loading) return;

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 1) {
      setErrors(["Only one file can be uploaded"]);
      return;
    }

    handleFile(droppedFiles);
  };

  const removeFile = () => {
    setFile(null);
    setErrors([]);
  };

  const handleDownloadClick = () => {
    if (onDownload) onDownload();

    setTimeout(() => {
      setFile(null);
      setErrors([]);
      setLoading(false);
      setDownloadUrl(null);
      setConvertComplete(false);
      setProgress(0);
    }, 300);
  };

  const uploadFile = async () => {
    if (!file) {
      setErrors(["Please select a file first"]);
      return;
    }

    if (!endpoint) {
      setErrors(["API endpoint missing"]);
      return;
    }

    try {
      setLoading(true);
      setProgress(10);

      const formData = new FormData();
      formData.append("file", file);

      const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://hundredtools.onrender.com";

const response = await fetch(
  `${API_URL}${endpoint}`,
  {
    method: "POST",
    body: formData,
  }
);

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setProgress(70);

      const blob = await response.blob();

      setProgress(100);

      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setConvertComplete(true);
    } catch (err) {
      console.error(err);
      setErrors(["Upload or conversion failed"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">

        <div
          className={`upload-box ${convertComplete ? "complete-state" : ""}`}
          onClick={() => {
            if (!file && !loading && !convertComplete) {
              inputRef.current.click();
            }
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >

          {!file && !convertComplete && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>

              <h3>Drag & Drop Files Here</h3>

              <p>or click to browse from your computer</p>
            </>
          )}

          {file && !convertComplete && (
            <div className="upload-preview upload-preview-grid">
              <div className="upload-file-item">

                <span className="file-card-icon">
                  📄
                </span>

                <div className="file-card-meta">
                  <p className="file-card-name">
                    {file.name}
                  </p>

                  <span className="file-card-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>

                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  disabled={loading}
                >
                  <RxCross1 />
                </button>

              </div>
            </div>
          )}

          {loading && (
            <div
              className="upload-progress-wrap"
              role="status"
              aria-live="polite"
            >

              <div className="upload-progress-bar">
                <span
                  className="upload-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="upload-progress-text">
                Processing... {progress}%
              </p>

            </div>
          )}

          {convertComplete && downloadUrl && (
            <div className="upload-preview">
              <p className="merged-file-name">
                {downloadName}
              </p>
            </div>
          )}

        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          disabled={loading}
          onChange={(e) => {
            handleFile(e.target.files);
            e.target.value = "";
          }}
        />

        {!convertComplete && (
          <>
            <button
              className="upload-btn"
              onClick={() => inputRef.current.click()}
              disabled={loading}
            >
              Add File
            </button>

            {file && (
              <button
                className="upload-btn convert-btn"
                onClick={uploadFile}
                disabled={loading}
              >
                {loading ? "Processing..." : "Convert File"}
              </button>
            )}
          </>
        )}

        {convertComplete && downloadUrl && (
          <a
            href={downloadUrl}
            download={downloadName}
            className="upload-btn download-btn"
            onClick={handleDownloadClick}
          >
            Download File
          </a>
        )}

        {errors.length > 0 && (
          <div className="upload-errors">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default FileUploadSingle;