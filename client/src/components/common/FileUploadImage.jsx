import { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import "../../styles/fileUpload.css";

function FileUploadImage({
  accept = "image/*",
  maxFiles = 1,
  files,
  setFiles,
  onProcess,
  processComplete,
  downloadUrl,
  outputFileName,
  processLabel = "Process Image",
  successMessage = "Processed successfully",
  maxSizeMB = 50,
  onReset,
  processing = false,
  showProcessButton = true,
  uploadProgress = 0,
}) {
  const inputRef = useRef(null);
  const [errors, setErrors] = useState([]);
  const [dragging, setDragging] = useState(false);
  const progress = uploadProgress || 0;

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // ✅ Validate files
  const validateFiles = (selectedFiles) => {
    const valid = [];
    const errorList = [];

    for (let file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
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

  // ✅ Handle file selection
  const handleFiles = (selectedFiles) => {
    if (processing) return;

    const fileArray = Array.from(selectedFiles);
    const validated = validateFiles(fileArray);

    if (validated.length > 0) {
      let updatedFiles = [...files, ...validated];

      if (maxFiles) {
        updatedFiles = updatedFiles.slice(0, maxFiles);
      }

      setFiles(updatedFiles);
    }
  };

  // ✅ Remove single file
  const removeFile = (index) => {
    if (processing) return;

    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
  };

  // ✅ Remove all files
  const removeAllFiles = () => {
    if (processing) return;

    setFiles([]);
    setErrors([]);
  };

  // ✅ Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!processing) setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (!processing) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">

        {/* Upload Box */}
        <div
          className={`upload-box ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!processing) {
              inputRef.current.click();
            }
          }}
        >
          {/* Upload UI */}
          {files.length === 0 && !processComplete && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>
              <h3>Drag & Drop Files Here</h3>
              <p>or click to browse from your computer</p>
            </>
          )}

          {/* File Preview */}
          {files.length > 0 && !processComplete && (
            <div className="upload-preview">
              {files.map((file, index) => (
                <div key={index} className="upload-file-item">

                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width="120"
                  />

                  <p>{file.name}</p>

                  <span>
                    {(file.size / 1024).toFixed(2)} KB
                  </span>

                  <br />

                  <button
                    className="remove-btn"
                    onClick={() => removeFile(index)}
                    disabled={processing}
                  >
                    <RxCross1 />
                  </button>

                </div>
              ))}
            </div>
          )}

          {/* Processed File */}
          {processComplete && downloadUrl && (
            <div className="upload-preview">
              <p className="merged-file-name">
                {outputFileName}
              </p>
            </div>
          )}
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          style={{ display: "none" }}
          disabled={processing}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {/* Buttons */}
        {!processComplete && (
          <>
            <button
              className="upload-btn"
              onClick={() => inputRef.current.click()}
              disabled={processing}
            >
              {processing ? "Processing..." : "Add Files"}
            </button>

            {files.length > 0 && (
              <button
                className="upload-btn"
                onClick={removeAllFiles}
                disabled={processing}
              >
                Remove All
              </button>
            )}

            {files.length > 0 && onProcess && showProcessButton && (
              <button
                className="upload-btn merge-btn"
                onClick={onProcess}
                disabled={processing}
              >
                {processing ? "Processing..." : processLabel}
              </button>
            )}
          </>
        )}

        {/* Success Message */}
        {processComplete && (
          <p className="success-text">
            {successMessage}
          </p>
        )}

        {!processComplete && processing && (
          <div className="upload-progress-wrap" role="status" aria-live="polite">
            <div className="upload-progress-bar">
              <span className="upload-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="upload-progress-text">Processing... {progress}%</p>
          </div>
        )}

        {/* Download Button */}
        {processComplete && downloadUrl && (
          <a
            href={downloadUrl}
            download={outputFileName}
            className="upload-btn download-btn"
            onClick={onReset}
          >
            Download
          </a>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="upload-errors">
            {errors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default FileUploadImage;