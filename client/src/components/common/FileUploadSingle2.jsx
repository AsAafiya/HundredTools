import { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import "../../styles/fileUpload.css";
import { RxCross1 } from "react-icons/rx";

function FileUploadSingle2({
  accept = ".pdf",
  maxSizeMB = 50,
  onFileChange,
  children,
  onAction,
  actionLabel = "Convert File",
  actionLoadingLabel = "Processing...",
  actionLoading = false,
  actionDisabled = false,
  complete = false,
  completedFileName = "output.pdf",
  completedDownloadUrl = "",
  downloadLabel = "Download PDF",
  onDownload,
  uploadProgress = 0,
}) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const progress = uploadProgress || 0;

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (selectedFile) => {
    const errorList = [];

    if (!selectedFile.name.toLowerCase().endsWith(accept)) {
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
    if (actionLoading) return;

    const selectedFile = selectedFiles[0];

    if (!selectedFile) return;

    const validated = validateFile(selectedFile);

    if (validated) {
      setFile(validated);

      if (onFileChange) {
        onFileChange(validated);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (actionLoading) return;

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 1) {
      setErrors(["Only one file can be uploaded"]);
      return;
    }

    handleFile(droppedFiles);
  };

  const removeFile = () => {
    if (actionLoading) return;

    setFile(null);
    setErrors([]);

    if (onFileChange) {
      onFileChange(null);
    }
  };

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div
          className={`upload-box ${complete ? "complete-state" : ""}`}
          onClick={() => {
            if (!file && !complete) {
              inputRef.current.click();
            }
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!file && !complete && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>

              <h3>Drag & Drop Files Here</h3>

              <p>or click to browse from your computer</p>
            </>
          )}

          {file && !complete && (
            <div className="upload-preview upload-preview-grid">
              <div className="upload-file-item">
                <span className="file-card-icon" aria-hidden="true">
                  📄
                </span>

                <div className="file-card-meta">
                  <p className="file-card-name">{file.name}</p>
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
                  disabled={actionLoading}
                >
                  <RxCross1 />
                </button>
              </div>
            </div>
          )}

          {complete && (
            <div className="upload-preview">
              <p className="merged-file-name">{completedFileName}</p>
            </div>
          )}

          {file && !complete && children}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          disabled={actionLoading}
          onChange={(e) => {
            handleFile(e.target.files);
            e.target.value = "";
          }}
        />

        {!complete && (
          <>
            <button
              className="upload-btn"
              onClick={() => inputRef.current.click()}
              disabled={actionLoading}
            >
              Add Files
            </button>

            {file && onAction && (
              <button
                type="button"
                className="upload-btn convert-btn"
                onClick={onAction}
                disabled={actionDisabled}
              >
                {actionLoading ? actionLoadingLabel : actionLabel}
              </button>
            )}
          </>
        )}

        {!complete && actionLoading && (
          <div
            className="upload-progress-wrap"
            role="status"
            aria-live="polite"
          >
            <div className="upload-progress-bar">
              <span className="upload-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="upload-progress-text">Converting PDF... {progress}%</p>
          </div>
        )}

        {complete && completedDownloadUrl && (
          <a
            href={completedDownloadUrl}
            download={completedFileName}
            className="upload-btn download-btn"
            onClick={handleDownloadClick}
          >
            {downloadLabel}
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

export default FileUploadSingle2;
