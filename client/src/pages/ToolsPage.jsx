import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ToolCard from "../components/tools/ToolCard";
import "../styles/hero.css";

const toolsByCategory = {
  all: {
    title: "All Tools",
    subtitle: "Browse all available document and image tools",
    tools: [
      {
        title: "Merge PDF",
        description: "Combine multiple PDF files into a single document effortlessly",
        icon: "📄",
        path: "/tools/merge-pdf",
      },
      {
        title: "Split PDF",
        description: "Extract specific pages or split PDF into multiple files",
        icon: "✂️",
        path: "/tools/split-pdf",
      },
      {
        title: "Compress PDF",
        description: "Reduce PDF file size while maintaining quality",
        icon: "↗",
        path: "/tools/compress-pdf",
      },
      {
        title: "PDF to JPG",
        description: "Convert PDF pages to high-quality JPG images",
        icon: "🖼️",
        path: "/tools/pdf-to-jpg",
      },
      {
        title: "JPG to PDF",
        description: "Convert JPG images into a single PDF file",
        icon: "🔁",
        path: "/tools/jpg-to-pdf",
      },
      {
        title: "PDF to Word",
        description: "Convert PDF documents to editable Word format",
        icon: "📝",
        path: "/tools/pdf-to-word",
      },
      {
        title: "Word to PDF",
        description: "Convert Word documents into PDF format",
        icon: "🔁",
        path: "/tools/word-to-pdf",
      },
      {
        title: "Add Page Numbers",
        description: "Add page numbers to PDF pages with custom position",
        icon: "🔢",
        path: "/tools/add-page-numbers",
      },
      {
        title: "Add Watermark",
        description: "Protect PDFs by adding custom watermarks",
        icon: "💧",
        path: "/tools/add-watermark",
      },
      {
        title: "Compress Image",
        description: "Reduce image file size without losing quality",
        icon: "↗",
        path: "/tools/image/compress-image",
      },
      {
        title: "Resize Image",
        description: "Change image dimensions easily",
        icon: "↙",
        path: "/tools/image/resize-image",
      },
      {
        title: "Convert Image",
        description: "Convert image format quickly",
        icon: "🔁",
        path: "/tools/image/convert-image",
      },
      {
        title: "Crop Image",
        description: "Crop images to custom dimensions",
        icon: "✂️",
        path: "/tools/image/crop-image",
      },
    ],
  },
  pdf: {
    title: "PDF Tools",
    subtitle: "All available PDF tools",
    tools: [
      {
        title: "Merge PDF",
        description: "Combine multiple PDF files into a single document effortlessly",
        icon: "📄",
        path: "/tools/merge-pdf",
      },
      {
        title: "Split PDF",
        description: "Extract specific pages or split PDF into multiple files",
        icon: "✂️",
        path: "/tools/split-pdf",
      },
      {
        title: "Compress PDF",
        description: "Reduce PDF file size while maintaining quality",
        icon: "↗",
        path: "/tools/compress-pdf",
      },
      {
        title: "PDF to JPG",
        description: "Convert PDF pages to high-quality JPG images",
        icon: "🖼️",
        path: "/tools/pdf-to-jpg",
      },
      {
        title: "JPG to PDF",
        description: "Convert JPG images into a single PDF file",
        icon: "🔁",
        path: "/tools/jpg-to-pdf",
      },
      {
        title: "PDF to Word",
        description: "Convert PDF documents to editable Word format",
        icon: "📝",
        path: "/tools/pdf-to-word",
      },
      {
        title: "Word to PDF",
        description: "Convert Word documents into PDF format",
        icon: "🔁",
        path: "/tools/word-to-pdf",
      },
      {
        title: "Add Page Numbers",
        description: "Add page numbers to PDF pages with custom position",
        icon: "🔢",
        path: "/tools/add-page-numbers",
      },
      {
        title: "Add Watermark",
        description: "Protect PDFs by adding custom watermarks",
        icon: "💧",
        path: "/tools/add-watermark",
      },
    ],
  },
  image: {
    title: "Image Tools",
    subtitle: "All available image tools",
    tools: [
      {
        title: "Compress Image",
        description: "Reduce image file size without losing quality",
        icon: "↗",
        path: "/tools/image/compress-image",
      },
      {
        title: "Resize Image",
        description: "Change image dimensions easily",
        icon: "↙",
        path: "/tools/image/resize-image",
      },
      {
        title: "Convert Image",
        description: "Convert image format quickly",
        icon: "🔁",
        path: "/tools/image/convert-image",
      },
      {
        title: "Crop Image",
        description: "Crop images to custom dimensions",
        icon: "✂️",
        path: "/tools/image/crop-image",
      },
      {
  title: "AI Resume Builder",
  description: "Create professional resumes using AI",
  icon: "📄",
  path: "/resume-builder",
},
    ],
  },
};

function ToolsPage() {
  const { category } = useParams();

  const categoryData = useMemo(() => {
    if (!category) return null;
    return toolsByCategory[category.toLowerCase()] || null;
  }, [category]);

  if (!categoryData) {
    return (
      <div className="page-container" style={{ padding: "40px 20px" }}>
        <h1>Tools</h1>
        <p>Category not found.</p>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <section className="tool-section section-divider tools-page-home-style">
      <div className="site-container">
        <h2>{categoryData.title}</h2>
        <p>{categoryData.subtitle}</p>

        <div className="tool-grid">
          {categoryData.tools.map((tool) => (
            <ToolCard
              key={tool.path}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ToolsPage;
