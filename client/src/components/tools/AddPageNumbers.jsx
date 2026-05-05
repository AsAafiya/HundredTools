import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import FileUploadSingle2 from "../common/FileUploadSingle2";
import Features from "../common/Features";
import { addPageNumbersWithProgress } from "../../services/pdfService";
import "../../styles/tool.css";
import { useError } from "../../context/ErrorContext";

const POSITIONS = [
  { value: "top-left",     label: "Top Left" },
  { value: "top-center",   label: "Top Center" },
  { value: "top-right",    label: "Top Right" },
  { value: "bottom-left",  label: "Bottom Left" },
  { value: "bottom-center",label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
];

function AddPageNumbers() {
  const { showError } = useError();
  const [selectedFile, setSelectedFile] = useState(null);
  const [position, setPosition] = useState("bottom-center");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [complete, setComplete] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAddNumbers = async () => {
    if (!selectedFile) {
      showError("Please upload a PDF file first.");
      return;
    }

    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);
      setMessage("");

      const blob = await addPageNumbersWithProgress(selectedFile, position, (p) => setUploadProgress(p));

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setComplete(true);
      setMessage("Page numbers added successfully.");
    } catch {
      showError("Failed to add page numbers. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDownload = () => {
    setTimeout(() => {
      setSelectedFile(null);
      setDownloadUrl("");
      setComplete(false);
      setMessage("");
      setLoading(false);
      setResetKey((k) => k + 1);
    }, 300);
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <Link to="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </Link>
      </div>

      <h1>Add Page Numbers</h1>
      <p className="subtitle">Add page numbers to every page of your PDF</p>

      <div
        style={{
          margin: "0 auto 8px",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(110px, 1fr))",
          gap: "10px",
          maxWidth: "470px",
        }}
      >
        {POSITIONS.map((pos) => (
          <button
            key={pos.value}
            type="button"
            onClick={() => setPosition(pos.value)}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: position === pos.value ? "2px solid #4f6df5" : "1.5px solid #d5dbf0",
              background: position === pos.value ? "#eef2ff" : "white",
              color: position === pos.value ? "#4f6df5" : "#4b5777",
              fontWeight: position === pos.value ? 600 : 400,
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.15s ease",
            }}
          >
            {pos.label}
          </button>
        ))}
      </div>

      <FileUploadSingle2
        key={resetKey}
        accept=".pdf"
        onFileChange={setSelectedFile}
        onAction={handleAddNumbers}
        actionLabel="Convert File"
        actionLoadingLabel="Processing..."
        actionLoading={loading}
        actionDisabled={!selectedFile || loading}
        complete={complete}
        completedFileName="page-numbered.pdf"
        completedDownloadUrl={downloadUrl}
        downloadLabel="Download PDF"
        onDownload={handleDownload}
        uploadProgress={uploadProgress}
      />

      {message && <p className="subtitle">{message}</p>}

      <Features />
    </div>
  );
}

export default AddPageNumbers;
