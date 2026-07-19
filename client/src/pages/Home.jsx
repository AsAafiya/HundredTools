import ToolSection from "../components/tools/ToolSection";
import "../styles/hero.css";
import { Link } from "react-router-dom";

const Home = () => {

  const scrollToTools = () => {
    document.getElementById("tools-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const pdfTools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into a single document effortlessly",
      icon: "📄",
      path: "/tools/merge-pdf"
    },
    {
      title: "Split PDF",
      description: "Extract specific pages or split PDF into multiple files",
      icon: "✂️",
      path: "/tools/split-pdf"
    },
    {
      title: "Compress PDF",
      description: "Reduce PDF file size while maintaining quality",
      icon: "↗",
      path: "/tools/compress-pdf"
    },
    {
      title: "PDF to JPG",
      description: "Convert PDF pages to high-quality JPG images",
      icon: "🖼️",
      path: "/tools/pdf-to-jpg"
    },
    {
      title: "JPG to PDF",
      description: "Convert JPG images into a single PDF file",
      icon: "🔁",
      path: "/tools/jpg-to-pdf"
    },
    {
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word format",
      icon: "📝",
      path: "/tools/pdf-to-word"
    },
    {
      title: "Word to PDF",
      description: "Convert Word documents into PDF format",
      icon: "🔁",
      path: "/tools/word-to-pdf"
    },
    {
      title: "Add Page Numbers",
      description: "Add page numbers to PDF pages with custom position",
      icon: "🔢",
      path: "/tools/add-page-numbers"
    },
    {
      title: "Add Watermark",
      description: "Protect PDFs by adding custom watermarks",
      icon: "💧",
      path: "/tools/add-watermark"
    }
  ];

  const imageTools = [
    {
      title: "Compress Image",
      description: "Reduce image file size without losing quality",
      icon: "↗",
      path: "/tools/image/compress-image"
    },
    {
      title: "Resize Image",
      description: "Change image dimensions easily",
      icon: "↙",
      path: "/tools/image/resize-image"
    },
    {
      title: "Convert JPG to PNG",
      description: "Convert JPG images to PNG format",
      icon: "🔁",
      path: "/tools/image/jpg-to-png"
    },
    {
      title: "Remove Background",
      description: "Automatically remove backgrounds from images",
      icon: "⌫",
      path: "/tools/image/remove-bg"
    }
  ];

  const audioTools = [
    {
      title: "Speech to Text",
      description: "Convert spoken words into editable text instantly",
      icon: "🎙️",
      path: "/tools/speech-to-text"
    },
    {
      title: "To-Do List",
      description: "Plan your day with daily, weekly, routine, productivity, and schedule planners",
      icon: "📋",
      path: "/tools/to-do-list"
    }
  ];

  const videoTools = [
    {
      title: "Compress Video",
      description: "Reduce video file size while maintaining quality",
      icon: "↗",
      path: "/tools/compress-video"
    },
    {
      title: "Convert MP4 to AVI",
      description: "Convert MP4 videos to AVI format",
      icon: "🔁",
      path: "/tools/mp4-to-avi"
    },
    {
      title: "Extract Audio",
      description: "Extract audio tracks from video files",
      icon: "🎵",
      path: "/tools/extract-audio"
    },
    {
      title: "Trim Video",
      description: "Cut and trim videos easily",
      icon: "✂️",
      path: "/tools/trim-video"
    }
  ];

  return (
    <div className="home">

      {/* HERO SECTION */}

      <section className="hero-section">
        <div className="site-container">

          <div className="hero">

            <span className="badge">✨ 100+ Tools for Your Documents</span>

            <h1>
              Document Magic <br /> Happens Here
            </h1>

            <p>
              Transform your documents, images, and videos with our powerful
              suite of tools. Fast, secure, and incredibly easy to use.
            </p>

            <div className="hero-buttons" role="group" aria-label="Primary landing page actions">
              <button type="button" className="primary-btn" onClick={scrollToTools} aria-label="Jump to tools section">
                Start Converting Now
              </button>

              <Link to="/tools/all" className="secondary-btn" aria-label="Browse all tools">
                Explore All Tools
              </Link>
            </div>

            <div className="hero-highlights" aria-label="Platform highlights">
              <div className="highlight-card">
                <strong>⚡ Fast</strong>
                <span>Instant file transformations with a clean workflow.</span>
              </div>
              <div className="highlight-card">
                <strong>🛡️ Secure</strong>
                <span>Reliable processing designed for everyday productivity.</span>
              </div>
              <div className="highlight-card">
                <strong>🎯 Focused</strong>
                <span>Stay organized with smart tools and a calm interface.</span>
              </div>
            </div>

            <div className="stats">

              <div className="stat-card">
                <h2>100+</h2>
                <p>Tools Available</p>
              </div>

              <div className="stat-card">
                <h2>50M+</h2>
                <p>Files Processed</p>
              </div>

              <div className="stat-card">
                <h2>99.9%</h2>
                <p>Uptime</p>
              </div>

            </div>

            <div className="hero-steps" aria-label="How HundredTools works">
              <div className="step-card">
                <span>1</span>
                <h3>Upload your file</h3>
                <p>Drop in a PDF, image, or video and get started instantly.</p>
              </div>
              <div className="step-card">
                <span>2</span>
                <h3>Choose a tool</h3>
                <p>Pick the conversion or edit you need from our curated toolbox.</p>
              </div>
              <div className="step-card">
                <span>3</span>
                <h3>Download and share</h3>
                <p>Get a polished result in seconds and move on with your day.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="value-section" aria-label="Why choose HundredTools">
        <div className="site-container">
          <div className="value-grid">
            <article className="value-card">
              <h3>Fast by default</h3>
              <p>Every workflow is designed to feel quick, clear, and frictionless.</p>
            </article>
            <article className="value-card">
              <h3>One workspace</h3>
              <p>Manage PDFs, images, speech, and video tools without leaving the page.</p>
            </article>
            <article className="value-card">
              <h3>Built for daily work</h3>
              <p>Ideal for students, creators, and professionals who need dependable tools.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="tools-section" className="tools-showcase">
        <div className="site-container">
          <div className="tools-showcase-header">
            <span className="section-eyebrow">Popular tools</span>
            <h2>Everything you need to work faster with files</h2>
            <p>
              Pick a category and jump straight into the most useful conversions,
              edits, and cleanup tools for your daily workflow.
            </p>
          </div>

          {/* PDF TOOLS */}

          <ToolSection
            title="PDF Tools"
            subtitle="Professional tools for all your PDF needs"
            tools={pdfTools.slice(0, 4)}
            category="pdf"
          />

          {/* IMAGE TOOLS */}

          <ToolSection
            title="Image Tools"
            subtitle="Professional tools for all your image needs"
            tools={imageTools.slice(0, 4)}
            category="image"
            withDivider
          />

          <ToolSection
            title="Audio Tools"
            subtitle="Convert speech and audio files quickly"
            tools={audioTools}
            category="audio"
            withDivider
          />

          <ToolSection
            title="Video Tools"
            subtitle="Professional tools for all your video needs"
            tools={videoTools.slice(0, 4)}
            category="video"
            withDivider
          />
        </div>
      </section>
     

    </div>
  );
};

export default Home;