
import { FaArrowLeft } from "react-icons/fa";
import FileUploadMultiple from "../common/FileUploadMultiple";
import Features from "../common/Features";
import "../../styles/tool.css";

function MergePdf() {
  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> {"\u00A0"} Back to Home
        </a>
      </div>

      <h1>Merge Pdf</h1>

      <p className="subtitle">
        Combine multiple PDF files into a single document
      </p>

      <FileUploadMultiple />
      <Features />
    </div>
  );
}

export default MergePdf;
