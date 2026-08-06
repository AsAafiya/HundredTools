import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { removeBackground } from "@imgly/background-removal";

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusText, setStatusText] = useState("");

  // Handle Image Selection
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      setError("");
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
      setProcessedImage(null); // Clear previous results
      setUploadProgress(0);
      setStatusText("");
    }
  };

  // Run Frontend Background Removal
  const handleRemoveBg = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError("");
    setStatusText("Initializing AI engine & loading models... (this happens once)");
    setUploadProgress(5);

    try {
      // Configuration for imgly background removal
      const config = {
        progress: (key, current, total) => {
          const percent = Math.round((current / total) * 100);
          if (key === "compute:inference") {
            setStatusText(`AI segmenting image: ${percent}%`);
            setUploadProgress(20 + Math.round(percent * 0.7)); // Map to 20-90%
          } else if (key.startsWith("fetch:")) {
            const asset = key.replace("fetch:", "");
            setStatusText(`Downloading AI assets (${asset}): ${percent}%`);
            setUploadProgress(5 + Math.round(percent * 0.15)); // Map to 5-20%
            if (percent === 100) {
              setStatusText("Compiling AI models & initializing WASM threads...");
            }
          }
        }
      };

      // The background removal runs entirely in the browser using WebAssembly
      const responseBlob = await removeBackground(file, config);

      setStatusText("Applying edge-smoothing filters...");
      setUploadProgress(95);

      const url = window.URL.createObjectURL(responseBlob);
      setProcessedImage(url);
      setUploadProgress(100);
      setStatusText("Done!");
    } catch (err) {
      console.error("Frontend Background Removal Error:", err);
      setError("Something went wrong while removing the background locally. Please try a different image.");
    } finally {
      setLoading(false);
    }
  };

  const clearPreview = () => {
    setFile(null);
    setImage(null);
    setProcessedImage(null);
    setError("");
    setUploadProgress(0);
    setStatusText("");
  };

  return (
    <div className="tool-page">
      {/* Back Button */}
      <div className="back-btn">
        <Link to="/">
          <FaArrowLeft style={{ marginRight: "6px" }} /> Back to Tools
        </Link>
      </div>

      {/* Headings */}
      <h1>Background Remover</h1>
      <p className="subtitle">Automatically remove background from your images using AI</p>

      {/* Error Message */}
      {error && <p className="tool-status tool-error">{error}</p>}

      {/* Tool Container */}
      <div className="pdf-result-card">
        
        {/* If no image selected, show Upload Button */}
        {!image ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <label 
              htmlFor="upload-input" 
              className="format-card" 
              style={{ display: "inline-block", width: "auto", cursor: "pointer" }}
            >
              <span>✂️ Choose Image</span>
              <p>Select PNG, JPG or WEBP</p>
            </label>
            <input
              id="upload-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          /* Selection Preview & Controls */
          <div>
            {/* Clear Button */}
            <button className="preview-close-btn" onClick={clearPreview} title="Clear Image">
              ×
            </button>

            {/* Layout For Side-by-Side Previews */}
            <div className="resize-controls">
              {/* Original Image Preview */}
              <div className="resize-input" style={{ minWidth: "250px", flex: "1 1 300px" }}>
                <label>Original Image</label>
                <img 
                  src={image} 
                  alt="Original" 
                  style={{ width: "100%", maxHeight: "250px", objectFit: "contain", borderRadius: "8px", marginTop: "10px" }} 
                />
              </div>

              {/* Processed Image Preview */}
              {processedImage && (
                <div className="resize-input" style={{ minWidth: "250px", flex: "1 1 300px" }}>
                  <label>Background Removed</label>
                  <img 
                    src={processedImage} 
                    alt="Result" 
                    style={{ 
                      width: "100%", 
                      maxHeight: "250px", 
                      objectFit: "contain", 
                      borderRadius: "8px", 
                      marginTop: "10px", 
                      backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)", 
                      backgroundSize: "20px 20px", 
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0" 
                    }} 
                  />
                </div>
              )}
            </div>

            {/* Progress indicator */}
            {loading && (
              <div style={{ margin: "20px auto", maxWidth: "450px", padding: "10px" }}>
                <div style={{
                  height: "8px",
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.08)",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${uploadProgress}%`,
                    backgroundColor: "#4f46e5",
                    transition: "width 0.4s ease"
                  }}></div>
                </div>
                <p style={{ marginTop: "10px", fontSize: "14px", fontWeight: "500", color: "#4b5563" }}>
                  {statusText} {uploadProgress > 0 && uploadProgress < 100 ? `(${uploadProgress}%)` : ""}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: "20px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              {!processedImage ? (
                <button
                  onClick={handleRemoveBg}
                  disabled={loading}
                  className={`format-card ${loading ? 'disabled' : 'active'}`}
                  style={{ width: "220px", margin: "0" }}
                >
                  <span>{loading ? "Processing..." : "Remove Background"}</span>
                </button>
              ) : (
                <>
                  <a
                    href={processedImage}
                    download="background-removed.png"
                    className="download-btn"
                  >
                    <button className="format-card active" style={{ width: "220px", margin: "0" }}>
                      <span>📥 Download</span>
                    </button>
                  </a>
                  <button
                    onClick={clearPreview}
                    className="format-card"
                    style={{ width: "220px", margin: "0" }}
                  >
                    <span>✨ New Image</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;