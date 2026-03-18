import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileUploadWatermark from "../common/FileUploadWatermark";
import Features from "../common/Features";
import { addWatermark } from "../../services/pdfService";
import "../../styles/tool.css";

function AddWatermark() {

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [complete, setComplete] = useState(false);
  const [fileName, setFileName] = useState("");
  const [resetKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleWatermark = async () => {

    if (!file) {
      alert("Upload a PDF first");
      return;
    }

    try {
      const startedAt = Date.now();
      const minProgressMs = 900;
      setLoading(true);

      const result = await addWatermark(file, text);

      const elapsed = Date.now() - startedAt;
      if (elapsed < minProgressMs) {
        await new Promise((resolve) => setTimeout(resolve, minProgressMs - elapsed));
      }

      const url = window.URL.createObjectURL(result);

      setDownloadUrl(url);
      setComplete(true);
      setFileName("Nexora_watermarked.pdf");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

      <h1>Add Watermark</h1>

      <p className="subtitle">
        Add custom watermark text to your PDF
      </p>

      {/* <input
        type="text"
        placeholder="Enter watermark text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="watermark-input"
      /> */}

      <FileUploadWatermark
        key={resetKey}
        onFileChange={setFile}
        onMerge={handleWatermark}
        downloadUrl={downloadUrl}
        mergeComplete={complete}
        mergedFileName={fileName}
        watermarkText={text}
        setWatermarkText={setText}
        onDownload={handleDownload}
        isProcessing={loading}
        processingLabel="Applying watermark..."
      />

      <Features />

    </div>
  );
}

export default AddWatermark;