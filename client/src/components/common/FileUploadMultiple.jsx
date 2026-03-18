import { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import "../../styles/fileUpload.css";
import { RxCross1 } from "react-icons/rx";

function FileUploadMultiple({
  accept = ".pdf",
  maxSizeMB = 50,
  onFilesChange,
  onMerge,
  downloadUrl,
  mergeComplete,
  mergedFileName,
  processLabel = "Process PDF",
  downloadLabel = "Download PDF",
  onDownload,
  isProcessing = false,
  processingLabel = "Converting PDF...",
  minFilesForProcess = 1,
  minFilesMessage = "",
  showOnlyProcessAfterSelection = false,
}) {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [dragging, setDragging] = useState(false);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const acceptedTypes = accept
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const isAcceptedFile = (file) => {
    if (acceptedTypes.length === 0) {
      return true;
    }

    const lowerName = file.name.toLowerCase();
    const lowerMimeType = (file.type || "").toLowerCase();

    return acceptedTypes.some((type) => {
      if (type.startsWith(".")) {
        return lowerName.endsWith(type);
      }

      return lowerMimeType === type;
    });
  };

  const validateFiles = (selectedFiles) => {
    const valid = [];
    const errorList = [];

    for (let file of selectedFiles) {
      if (!isAcceptedFile(file)) {
        errorList.push(`${file.name} → Invalid file type`);
        continue;
      }

      if (file.size > maxSizeBytes) {
        errorList.push(`${file.name} → File exceeds ${maxSizeMB}MB`);
        continue;
      }

      valid.push(file);
    }

    setErrors(errorList);
    return valid;
  };

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const validated = validateFiles(fileArray);

    if (validated.length > 0) {
      const updatedFiles = [...files, ...validated];
      setFiles(updatedFiles);

      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
    }
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

    if (onFilesChange) {
      onFilesChange(updated);
    }
  };

  const removeAllFiles = () => {
    setFiles([]);
    setErrors([]);

    if (onFilesChange) {
      onFilesChange([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isProcessing) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (!isProcessing) {
      const droppedFiles = e.dataTransfer.files;
      handleFiles(droppedFiles);
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
          className={`upload-box ${dragging ? "dragging" : ""} ${mergeComplete ? "complete-state" : ""}`}
          onClick={() => {
            if (!isProcessing) {
              inputRef.current.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Upload UI */}
          {files.length === 0 && !mergeComplete && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>

              <h3>Drag & Drop Files Here</h3>

              <p>or click to browse from your computer</p>
            </>
          )}

          {/* File List */}
          {files.length > 0 && !mergeComplete && (
            <div className="upload-preview upload-preview-grid">
              {files.map((file, index) => (
                <div key={index} className="upload-file-item">
                  <span className="file-card-icon" aria-hidden="true">📄</span>

                  <div className="file-card-meta">
                    <p className="file-card-name">{file.name}</p>
                    <span className="file-card-size">{(file.size / 1024).toFixed(2)} KB</span>
                  </div>

                  <button
                    className="remove-btn"
                    disabled={isProcessing}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <RxCross1 />
                  </button>
                </div>
              ))}
            </div>
          )}

          {mergeComplete && (
            <div className="upload-preview">
              <p className="merged-file-name">{mergedFileName}</p>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {/* Buttons */}
        {!mergeComplete && (
          <>
            <button
              className="upload-btn"
              onClick={() => inputRef.current.click()}
              disabled={isProcessing}
            >
              Add Files
            </button>

            {files.length > 0 && (
              <button
                className="upload-btn"
                onClick={removeAllFiles}
                disabled={isProcessing}
              >
                Remove All
              </button>
            )}

            {files.length > 0 && onMerge && (
              <button
                className="upload-btn convert-btn"
                onClick={onMerge}
                disabled={files.length < minFilesForProcess || isProcessing}
              >
                {isProcessing ? "Processing..." : processLabel}
              </button>
            )}

            {files.length > 0 && files.length < minFilesForProcess && minFilesMessage && (
              <p className="upload-progress-text">{minFilesMessage}</p>
            )}
          </>
        )}

        {!mergeComplete && isProcessing && (
          <div className="upload-progress-wrap" role="status" aria-live="polite">
            <div className="upload-progress-bar">
              <span className="upload-progress-fill" />
            </div>
            <p className="upload-progress-text">{processingLabel}</p>
          </div>
        )}

        {/* Download Button */}
        {mergeComplete && downloadUrl && (
          <a
            href={downloadUrl}
            download={mergedFileName || "output.pdf"}
            className="upload-btn download-btn"
            onClick={handleDownloadClick}
          >
            {downloadLabel}
          </a>
        )}

        {/* Error Messages */}
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

export default FileUploadMultiple;
