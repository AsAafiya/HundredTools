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
  processing = false
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

    if (processing) return;

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

    if (processing) return;

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 1) {
      setErrors(["Only one file can be uploaded"]);
      return;
    }

    handleFile(droppedFiles);
  };

  const removeFile = () => {

    if (processing) return;

    setFile(null);
    setErrors([]);

    if (onFileChange) {
      onFileChange(null);
    }
  };

  return (
    <div className="upload-container">

      <div className="upload-card">

        <div
          className="upload-box"
          onClick={() => {
            if (!processing && !file) {
              inputRef.current.click();
            }
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >

          {!file && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>

              <h3>Upload a PDF File</h3>

              <p>Click to browse from your computer</p>
            </>
          )}

          {file && (

            <div className="upload-preview">

              <div className="upload-file-item">

                <div className="file-info">
                  <p className="file-name">{file.name}</p>

                  <span className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>

                <button
                  className="remove-btn"
                  onClick={removeFile}
                  disabled={processing}
                >
                  Remove File
                </button>

                <input
                  type="text"
                  placeholder="Enter watermark text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="watermark-input"
                  disabled={processing}
                />

              </div>

            </div>

          )}

        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          disabled={processing}
          onChange={(e) => {
            handleFile(e.target.files);
            e.target.value = "";
          }}
        />

        {/* Add File Button */}
        {!file && (
          <button
            className="upload-btn"
            onClick={() => inputRef.current.click()}
            disabled={processing}
          >
            {processing ? "Processing..." : "Add File"}
          </button>
        )}

        {/* Watermark Button */}
        {file && onMerge && (
          <button
            className="upload-btn"
            disabled={!watermarkText || processing}
            onClick={onMerge}
          >
            {processing ? "Processing..." : "Add Watermark"}
          </button>
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