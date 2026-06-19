import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/GrammarChecker.css";

function GrammarChecker() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [resultText, setResultText] = useState("");
  const [errors, setErrors] = useState([]);
  const [popup, setPopup] = useState(null);

  // ✅ Grammar API (improved stability)
  const checkGrammar = async () => {
    try {
      const response = await fetch(
        "https://api.languagetool.org/v2/check",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
  text,
  language,
  enabledOnly: "false",
  level: "picky",
}),
        }
      );

      const data = await response.json();

      setResultText(text);
      setErrors(data.matches || []);
      setPopup(null);
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  // ✅ FIXED: safer popup handling
  const handleWordClick = (error) => {
    setPopup(error);
  };

  // ✅ FIXED: correct replacement without breaking text
  const replaceWord = (replacement) => {
    const start = popup.offset;
    const end = popup.offset + popup.length;

    const updated =
      resultText.slice(0, start) +
      replacement +
      resultText.slice(end);

    setResultText(updated);

    setErrors((prev) =>
      prev.filter((e) => e.offset !== popup.offset)
    );

    setPopup(null);
  };

  // ✅ Ignore word
  const ignoreWord = () => {
    setErrors((prev) =>
      prev.filter((e) => e.offset !== popup.offset)
    );

    setPopup(null);
  };

  // ✅ Render text safely
  const renderText = () => {
    if (!resultText) {
      return (
        <p className="placeholder-preview">
          Grammar results will appear here...
        </p>
      );
    }

    if (errors.length === 0) {
      return resultText;
    }

    let elements = [];
    let lastIndex = 0;

    errors.forEach((error, index) => {
      const start = error.offset;
      const end = error.offset + error.length;

      elements.push(
        <span key={`t-${index}`}>
          {resultText.slice(lastIndex, start)}
        </span>
      );

      elements.push(
        <span
          key={`e-${index}`}
          className="error-word"
          onClick={() => handleWordClick(error)}
        >
          {resultText.slice(start, end)}
        </span>
      );

      lastIndex = end;
    });

    elements.push(
      <span key="last">
        {resultText.slice(lastIndex)}
      </span>
    );

    return elements;
  };

  // 🔥 FIXED: Correct All (NO merging issue anymore)
  const correctAllErrors = () => {
    let corrected = resultText;

    // IMPORTANT: right → left processing
    const sorted = [...errors].sort(
      (a, b) => b.offset - a.offset
    );

    sorted.forEach((err) => {
      const suggestion =
        err.replacements?.[0]?.value;

      if (!suggestion) return;

      const start = err.offset;
      const end = err.offset + err.length;

      corrected =
        corrected.slice(0, start) +
        suggestion +
        corrected.slice(end);
    });

    setResultText(corrected);
    setErrors([]);
    setPopup(null);
  };

  // ✅ Copy fixed
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      alert("Copied successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <a href="/">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <div className="grammar-container">
        <p className="heading">Grammar & Spell Checker</p>
        {/* Language Selector */}
  <div className="language-wrapper">
    <span>Select Language</span>

    <select
     className="language-select"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="en-US">English (US)</option>
      <option value="en-GB">English (UK)</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="es">Spanish</option>
      <option value="it">Italian</option>
      <option value="pt">Portuguese</option>
      <option value="nl">Dutch</option>
      <option value="pl">Polish</option>
      <option value="ru">Russian</option>
    </select>
  </div>

        <div className="editor-layout">

        <div className="left-panel">
  <div className="panel-title">
    Enter Text
  </div>

  

  <textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Type your text here..."
  />

  <div className="action-buttons">
    <button
      className="check-btn"
      onClick={checkGrammar}
    >
      Check Grammar
    </button>
  </div>
</div>

          {/* RIGHT */}
          <div className="right-panel">
            <div className="panel-title">
              Grammar Results
            </div>

            <div className="preview-box">
              {renderText()}
            </div>

            <div className="action-buttons">
              <button
                className="correct-btn"
                onClick={correctAllErrors}
                disabled={errors.length === 0}
              >
                Correct All
              </button>

              <button
                className="copy-btn"
                onClick={copyText}
              >
                Copy Text
              </button>
            </div>
          </div>

        </div>

        {/* POPUP */}
        {popup && (
          <div className="popup">
            <h4>Suggestions</h4>

            {(popup.replacements || [])
              .slice(0, 5)
              .map((item, i) => (
                <button
                  key={i}
                  onClick={() =>
                    replaceWord(item.value)
                  }
                >
                  {item.value}
                </button>
              ))}

            <button
              className="ignore-btn"
              onClick={ignoreWord}
            >
              Ignore
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GrammarChecker;