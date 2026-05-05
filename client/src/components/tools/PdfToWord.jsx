import { FaArrowLeft } from "react-icons/fa";
import FileUploadSingle from "../common/FileUploadSingle";
import Features from "../common/Features";
import "../../styles/tool.css";

function PdfToWord() {

  return (
    <div className="tool-page">

      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>PDF to Word</h1>

      <p className="subtitle">
        Convert PDF documents into editable Word files
      </p>

     <FileUploadSingle
      accept=".pdf"
      endpoint="/pdf/pdf-to-word"
      downloadName="converted.docx"
    />

      <Features />

    </div>
  );
}

export default PdfToWord;