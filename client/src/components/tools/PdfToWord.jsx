import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadSingle from "../common/FileUploadSingle";
import Features from "../common/Features";
import { pdfToWord } from "../../services/pdfService";
import "../../styles/tool.css";

function PdfToWord() {

  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [convertComplete, setConvertComplete] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleConvert = async () => {

    if (!file) {
      alert("Upload a PDF first");
      return;
    }

    try {

      const result = await pdfToWord(file);

      const url = window.URL.createObjectURL(result);

      setDownloadUrl(url);
      setConvertComplete(true);
      setFileName("Nexora_converted.docx");

    } catch (error) {
      console.error(error);
    }

  };

  const handleDownload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

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
      endpoint="/api/pdf/pdf-to-word"
      downloadName="converted.docx"
      onDownload={handleDownload}
    />

      <Features />

    </div>
  );
}

export default PdfToWord;