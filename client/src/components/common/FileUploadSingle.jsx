import { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import "../../styles/fileUpload.css";
import { RxCross1 } from "react-icons/rx";

function FileUploadSingle({
  accept = ".pdf",
  maxSizeMB = 50,
  endpoint,
  downloadName = "converted-file"
}) {

  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (selectedFile) => {

    const errorList = [];

    const allowedTypes = accept.split(",");

    const isValidType = allowedTypes.some(type =>
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
    if (onFileChange) {
      onFileChange(null);
    }
  };

  const uploadFile = async () => {

    if (!file) {
      setErrors(["Please select a file first"]);
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`https://hundredtools.onrender.com${endpoint}`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();

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
          className="upload-box"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >

          {!file && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>

              <h3>Upload File</h3>

              <p>Click to browse from your computer</p>
            </>
          )}

          {file && (

            <div className="upload-preview">

              <div className="upload-file-item">

                <p>{file.name}</p>

                <span>
                  {(file.size / 1024).toFixed(2)} KB
                </span>

                <br />

                <button className="remove-btn" onClick={removeFile}>
                   <RxCross1/>
                </button>

              </div>

            </div>

          )}

        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={(e) => {
            handleFile(e.target.files);
            e.target.value = "";
          }}
        />

        <button
          className="upload-btn"
          onClick={() => inputRef.current.click()}
        >
          Add File
        </button>

        <button
          className="upload-btn convert-btn"
          onClick={uploadFile}
          disabled={!file || loading}
        >
          {loading ? "Processing..." : "Convert File"}
        </button>

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