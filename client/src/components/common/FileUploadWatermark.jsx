import { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import "../../styles/fileUpload.css";

function FileUploadWatermark({
  accept = ".pdf",
  maxSizeMB = 50,
  onFileChange,
  onMerge,
  downloadUrl,
  mergeComplete,
  mergedFileName,
  watermarkText,
  setWatermarkText,
  onDownload,
  isProcessing = false,
  processingLabel = "Applying watermark...",
}) {

  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);

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

   if (isProcessing) return;

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

   if (isProcessing) return;

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 1) {
      setErrors(["Only one file can be uploaded"]);
      return;
    }

    handleFile(droppedFiles);
  };

  const removeFile = () => {

   if (isProcessing) return;

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
          className={`upload-box ${mergeComplete ? "complete-state" : ""}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >

          {/* Upload UI */}
          {!file && !mergeComplete && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>

              <h3>Drag & Drop Files Here</h3>

              <p>or click to browse from your computer</p>
            </>
          )}

          {/* File Preview */}
          {file && !mergeComplete && (

            <div className="upload-preview upload-preview-grid">

              <div className="upload-file-item">

                <span className="file-card-icon" aria-hidden="true">📄</span>

                <div className="file-info">
                  <p className="file-card-name">{file.name}</p>
                  <span className="file-card-size">{(file.size / 1024).toFixed(2)} KB</span>
                </div>

                <button className="remove-btn" onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }} disabled={isProcessing}>
                    ❌
                </button>

              </div>

            </div>

          )}

          {mergeComplete && (
            <div className="upload-preview">
              <p className="merged-file-name">{mergedFileName}</p>
            </div>
          )}

        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
         disabled={isProcessing}
          onChange={(e) => {
            handleFile(e.target.files);
            e.target.value = "";
          }}
        />

        {!mergeComplete && (
          <>
            <p className="watermark-steps">
              Step 1: Add PDF • Step 2: Enter watermark text • Step 3: Apply watermark
            </p>

            {/* Watermark text input */}
            <input
              type="text"
              placeholder="Type watermark text here"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="watermark-input"
              disabled={isProcessing}
              style={{ marginBottom: "10px" }}
            />

            {/* Buttons — always visible */}
            <button
                className="upload-btn"
                onClick={() => inputRef.current.click()}
                disabled={isProcessing}
            >
              Add Files
            </button>

            {onMerge && (
            <button
                className="upload-btn convert-btn"
                disabled={!file || !watermarkText || isProcessing}
                onClick={onMerge}
              title={!file ? "Please add a PDF first" : !watermarkText ? "Please enter watermark text" : ""}
            >
              {isProcessing ? "Applying..." : "Apply Watermark"}
            </button>
            )}

            {!file && <p className="watermark-hint">Please add one PDF file to continue.</p>}
            {file && !watermarkText && <p className="watermark-hint">Please enter watermark text to enable Apply Watermark.</p>}
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

        {mergeComplete && downloadUrl && (
          <a
            href={downloadUrl}
            download={mergedFileName || "watermarked.pdf"}
            className="upload-btn download-btn"
            onClick={handleDownloadClick}
          >
            Download PDF
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

export default FileUploadWatermark;