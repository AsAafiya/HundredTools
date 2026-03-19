import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import FileUploadSingle2 from "../common/FileUploadSingle2";
import Features from "../common/Features";
import { addPageNumbers } from "../../services/pdfService";
import "../../styles/tool.css";
import { useError } from "../../context/ErrorContext";

function AddPageNumbers() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
   const { showError } = useError();

  const handleAddNumbers = async () => {
    if (!selectedFile) {
      showError("Please upload a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const blob = await addPageNumbers(selectedFile);

      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "page-numbered.pdf";
      a.click();
      URL.revokeObjectURL(downloadUrl);

      showError("Page numbers added successfully. Download started.");
    } catch {
      showError("Failed to add page numbers. Please try again.");
    } finally {
      setLoading(false);
    }
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

      <FileUploadSingle2 accept=".pdf" onFileChange={setSelectedFile} />

      <button className="upload-btn" onClick={handleAddNumbers} disabled={loading}>
        {loading ? "Processing..." : "Add Page Numbers"}
      </button>

      {message && <p className="subtitle">{message}</p>}

      <Features />
    </div>
  );
}

export default AddPageNumbers;
