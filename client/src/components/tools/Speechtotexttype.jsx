import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCopy } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../../styles/tool.css";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Microphone Ready");
  const [supported, setSupported] = useState(true);
  const [language, setLanguage] = useState("en-US");

  const languages = [
    { label: "Auto Detect", code: "auto", lt: "auto" },
    { label: "English", code: "en-US", lt: "en" },
    { label: "Bengali", code: "bn-IN", lt: "bn" },
    { label: "Hindi", code: "hi-IN", lt: "hi" },
    { label: "Spanish", code: "es-ES", lt: "es" },
    { label: "Chinese", code: "zh-CN", lt: "zh" },
    { label: "Arabic", code: "ar-SA", lt: "ar" },
    { label: "French", code: "fr-FR", lt: "fr" },
    { label: "German", code: "de-DE", lt: "de" },
    { label: "Italian", code: "it-IT", lt: "it" },
    { label: "Japanese", code: "ja-JP", lt: "ja" },
    { label: "Portuguese", code: "pt-PT", lt: "pt" },
    { label: "Russian", code: "ru-RU", lt: "ru" },
  ];
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
  

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setSupported(false);
      setStatus("Speech recognition is not supported by this browser.");
    } else {
      setSupported(true);
      setStatus("Microphone Ready");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (listening) {
      setStatus("Listening...");
    } else if (browserSupportsSpeechRecognition) {
      setStatus("Microphone Ready");
    }
  }, [listening, browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    return () => {
      if (isRecording) {
        SpeechRecognition.stopListening();
      }
    };
  }, [isRecording]);

  const getTextMetrics = (value) => {
    const trimmed = value.trim();
    return {
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      chars: value.length,
    };
  };

  const getLanguageLabel = (code) => {
    const languageObj = languages.find((l) => l.code === code) || languages.find((l) => l.lt === code);
    return languageObj ? languageObj.label : code;
  };

  const handleRecord = () => {
    if (!supported) {
      setStatus("Speech recognition is unavailable in this browser.");
      return;
    }

    if (isRecording) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      setStatus("Stopped");
      return;
    }

    try {
      SpeechRecognition.startListening({
        continuous: true,
        interimResults: true,
        language: language === "auto" ? undefined : language,
      });
      setIsRecording(true);
      setStatus("Listening...");
    } catch (error) {
      console.error(error);
      setStatus("Unable to start speech recognition.");
    }
  };

  const handleCopyText = async () => {
    if (!text.trim()) {
      setStatus("No text available to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text.trim());
      setStatus("Original text copied to clipboard.");
    } catch (error) {
      console.error(error);
      setStatus("Unable to copy text.");
    }
  };

  const handleClear = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setText("");
    setIsRecording(false);
    setStatus(
      browserSupportsSpeechRecognition
        ? "Microphone Ready"
        : "Speech recognition unsupported"
    );
  };

  const originalMetrics = getTextMetrics(text);
  const statusClass = `tool-status ${/failed|error|unable|unsupported/i.test(status) ? "tool-error" : ""}`;

  const applyGrammarFixes = (original, matches) => {
    if (!matches || matches.length === 0) return original;
    const sorted = matches.slice().sort((a, b) => b.offset - a.offset);
    let updated = original;
    for (const m of sorted) {
      if (m.replacements && m.replacements.length > 0) {
        const r = m.replacements[0].value;
        updated = updated.slice(0, m.offset) + r + updated.slice(m.offset + m.length);
      }
    }
    return updated;
  };

  const applyCustomCorrections = (original) => {
    let corrected = original;

    // Capitalize sentence start and pronoun "I"
    corrected = corrected.replace(/(^|\s)i(\s|$|[,.!?])/g, (match, before, after) => `${before}I${after}`);
    corrected = corrected.replace(/^i(?=\s|$|[,.!?])/, "I");

    // Common colloquial speech to proper grammar
    corrected = corrected.replace(/\bI\s+im\b/gi, "I am");
    corrected = corrected.replace(/\bim\s+college\b/gi, "I am in college");
    corrected = corrected.replace(/\bI'm\s+college\b/gi, "I am in college");
    corrected = corrected.replace(/\bI\s+([A-Z][a-z]+)(,?)(\s+I am|\s+I'm)\b/, "I am $1$2 and I am");
    corrected = corrected.replace(/\bI\s+([A-Z][a-z]+)(?=\b)/, (match, name) => {
      if (/^I\s+(am|I'm|I am|i'm|i am)\b/.test(corrected)) return match;
      if (/^I\s+([A-Z][a-z]+),?\s+I\s+am\b/.test(corrected)) return match;
      return `I am ${name}`;
    });

    corrected = corrected.replace(/,\s*I am /g, ", and I am ");
    corrected = corrected.replace(/\s+([.,!?])/g, "$1");

    return corrected;
  };

  const grammarCheck = async () => {
    if (!text.trim()) {
      alert("Please provide text to check grammar.");
      return;
    }
    setStatus("Checking grammar...");
    try {
      const langObj = languages.find((l) => l.code === language) || languages[0];
      const ltLang = langObj.lt || langObj.code;

      const params = new URLSearchParams();
      params.append("text", text);
      params.append("language", ltLang);

      const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        body: params,
      });

      if (!res.ok) {
        throw new Error(`Grammar API error: ${res.status}`);
      }

      const data = await res.json();
      let corrected = applyGrammarFixes(text, data.matches);
      corrected = applyCustomCorrections(corrected);

      if (corrected === text) {
        setStatus("No grammar issues found");
        return;
      }

      setText(corrected);
      setStatus("Grammar corrected");
    } catch (err) {
      console.error(err);
      setStatus("Grammar check failed");
    }
  };

  return (
    <div className="tool-page">
      <div className="back-btn">
        <Link to="/">
          <FaArrowLeft />{"\u00A0"} Back to Home
        </Link>
      </div>

      <div className="speech-hero">
        <div className="speech-hero-copy">
          <p className="speech-eyebrow">Speech to Text</p>
          <h1>Speak naturally and turn every word into editable text.</h1>
          <p className="subtitle">
            Capture interviews, notes, and ideas in real time with a calm, focused experience.
          </p>

          <div className="speech-feature-list">
            <span className="speech-pill">Live transcription</span>
            <span className="speech-pill">Instant editing</span>
            <span className="speech-pill">Clear controls</span>
          </div>
        </div>

        <div className="speech-hero-card">
          <div className="speech-card-header">
            <div className={statusClass}>{status}</div>
            <div className="speech-card-settings">
              <label htmlFor="speech-language-select">Language</label>
              <select
                id="speech-language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
                aria-label="Select language for speech recognition"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isRecording ? "Listening for your words..." : "Your spoken words will appear here..."}
            className="speech-textarea"
            aria-label="Original spoken text"
          />

          <div className="metrics-row">
            <span>Original: {originalMetrics.words} words, {originalMetrics.chars} chars</span>
            <span>Ready when you are</span>
          </div>

          <div className="tool-controls">
            <button
              onClick={handleRecord}
              disabled={!supported}
              className={`tool-btn ${isRecording ? "btn-danger" : "btn-primary"}`}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>

            <button
              onClick={handleCopyText}
              className="tool-btn"
              disabled={!text.trim()}
              aria-label="Copy original text"
            >
              <FaCopy className="button-icon" aria-hidden="true" />
              Copy Original
            </button>

            <button onClick={handleClear} className="tool-btn">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;