import ToolSection from "../components/tools/ToolSection";
import "../styles/hero.css";
import { Link } from "react-router-dom";

const Home = () => {

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
      path: "/tools/compress-image"
    },
    {
      title: "Resize Image",
      description: "Change image dimensions easily",
      icon: "↙",
      path: "/tools/resize-image"
    },
    {
      title: "Convert JPG to PNG",
      description: "Convert JPG images to PNG format",
      icon: "🔁",
      path: "/tools/jpg-to-png"
    },
    {
      title: "Remove Background",
      description: "Automatically remove backgrounds from images",
      icon: "⌫",
      path: "/tools/remove-bg"
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

            <div className="hero-buttons">

              <button className="primary-btn">
                Start Converting Now
              </button>

              <Link to="/tools/pdf" className="secondary-btn">
                Explore All Tools
              </Link>

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

          </div>

        </div>
      </section>

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

      {/* VIDEO TOOLS */}

      <ToolSection
        title="Video Tools"
        subtitle="Professional tools for all your video needs"
        tools={videoTools.slice(0, 4)}
        category="video"
        withDivider
      />

    </div>
  );
};

export default Home;