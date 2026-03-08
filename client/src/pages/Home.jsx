import ToolSection from "../components/tools/ToolSection";
import "../styles/hero.css";

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
    },
  ];

  const imageTools = [
    {
      title: "Compress Image",
      description: "Reduce image file size without losing quality",
      icon: "↗",
    },
    {
      title: "Resize Image",
      description: "Change image dimensions to your specifications",
      icon: "↙",
    },
    {
      title: "Convert JPG to PNG",
      description: "Convert JPG images to PNG format seamlessly",
      icon: "🔁",
    },
    {
      title: "Remove Background",
      description: "Automatically remove backgrounds from images",
      icon: "⌫",
    },
  ];

  const videoTools = [
    {
      title: "Compress Video",
      description: "Reduce video file size while maintaining quality",
      icon: "↗",
    },
    {
      title: "Convert MP4 to AVI",
      description: "Convert MP4 videos to AVI format",
      icon: "🔁",
    },
    {
      title: "Extract Audio",
      description: "Extract audio tracks from video files",
      icon: "🎵",
    },
    {
      title: "Trim Video",
      description: "Cut and trim videos to exact length",
      icon: "✂️",
    },
  ];

  return (
    <div className="home">
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
              <button className="primary-btn">Start Converting Now</button>
              <button className="secondary-btn">Explore All Tools</button>
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

      <ToolSection
        title="PDF Tools"
        subtitle="Professional tools for all your PDF needs"
        tools={pdfTools}
      />

      <ToolSection
        title="Image Tools"
        subtitle="Professional tools for all your image needs"
        tools={imageTools}
        withDivider
      />

      <ToolSection
        title="Video Tools"
        subtitle="Professional tools for all your video needs"
        tools={videoTools}
        withDivider
      />
    </div>
  );
};

export default Home;