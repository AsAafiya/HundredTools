import { useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import "../../styles/fileUpload.css";

function FileUploadMultiple({ accept = ".pdf", maxSizeMB = 50 }) {

  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFiles = (selectedFiles) => {

    const valid = [];
    const errorList = [];

    for (let file of selectedFiles) {

      if (!file.name.toLowerCase().endsWith(accept)) {
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
      setFiles(prev => [...prev, ...validated]);
    }

  };

  const removeFile = (index) => {

    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

  };

  const removeAllFiles = () => {
    setFiles([]);
    setErrors([]);
  };

  return (
    <div className="upload-container">

      <div className="upload-card">

        <div className="upload-box">

          {/* Upload UI */}
          {files.length === 0 && (
            <>
              <div className="upload-icon">
                <TbUpload />
              </div>

              <h3>Drag & Drop Files Here</h3>

              <p>or click to browse from your computer</p>
            </>
          )}

          {/* File List */}
          {files.length > 0 && (

            <div className="upload-preview">

              {files.map((file, index) => (

                <div key={index} className="upload-file-item">

                  <p>{file.name}</p>

                  <span>
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                  <br/>
                  <button
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </button>

                </div>

              ))}

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

          {/* Add Files Button */}
          <button
            className="upload-btn"
            onClick={() => inputRef.current.click()}
          >
            Add Files
          </button>

          {/* Remove All Button */}
          {files.length > 0 && (
            <button
              className="upload-btn"
              onClick={removeAllFiles}
            >
              Remove All
            </button>
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