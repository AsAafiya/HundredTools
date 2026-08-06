import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/tool.css";
import Features from "../common/Features";
import { useError } from "../../context/ErrorContext";

function HashGenerator() {
  const { showError } = useError();
  const [inputText, setInputText] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [hashResult, setHashResult] = useState("");

  const handleGenerate = async () => {
    if (!inputText) {
      showError("Please enter text to generate a hash.");
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setHashResult(hashHex);
    } catch (error) {
      console.error(error);
      showError("Error generating hash");
    }
  };

  const handleCopy = async () => {
    if (!hashResult) return;
    try {
      await navigator.clipboard.writeText(hashResult);
    } catch (error) {
      console.error(error);
      showError("Error copying to clipboard");
    }
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <h1>Hash Generator</h1>
      <p className="subtitle">Generate SHA hashes from any text instantly</p>

      <div className="format-selector" style={{ maxWidth: "800px", margin: "30px auto", textAlign: "left", padding: "0 20px" }}>
        <h3 style={{ marginBottom: "15px", color: "var(--text-color, #1f2937)" }}>Select Hashing Algorithm</h3>
        <div className="format-options" style={{ justifyContent: "flex-start", gap: "15px" }}>
          {["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map((alg) => (
            <button
              key={alg}
              type="button"
              className={algorithm === alg ? "format-card active" : "format-card"}
              onClick={() => setAlgorithm(alg)}
              style={{ width: "120px", padding: "12px 18px" }}
            >
              <span>{alg}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "20px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontWeight: "600", fontSize: "16px", color: "var(--text-color, #1f2937)" }}>Input Text</label>
          <textarea
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              minHeight: "150px",
              padding: "15px",
              borderRadius: "12px",
              border: "1.5px solid #d5dbf0",
              fontSize: "16px",
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none",
              background: "#ffffff",
              color: "#1f2937"
            }}
          />
        </div>

        <div>
          <button
            type="button"
            className="format-card active"
            onClick={handleGenerate}
            style={{ width: "auto", padding: "12px 24px", fontSize: "16px", fontWeight: "600", margin: "0" }}
          >
            Generate Hash
          </button>
        </div>

        {hashResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", color: "var(--text-color, #1f2937)" }}>Generated Hash ({algorithm})</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                readOnly
                value={hashResult}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1.5px solid #d5dbf0",
                  fontSize: "15px",
                  backgroundColor: "#f8fafc",
                  color: "#334155",
                  outline: "none",
                  fontFamily: "monospace"
                }}
              />
              <button
                type="button"
                className="format-card active"
                onClick={handleCopy}
                style={{ width: "auto", padding: "12px 24px", fontSize: "16px", fontWeight: "600", margin: "0" }}
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      <Features />
    </div>
  );
}

export default HashGenerator;
