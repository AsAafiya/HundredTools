import ToolCard from "./ToolCard";
import { useNavigate } from "react-router-dom";

const ToolSection = ({ title, subtitle, tools, category, withDivider = false }) => {
  const navigate = useNavigate();
  const targetCategory =
    category || title?.toLowerCase().replace(" tools", "").trim();

  return (
    <section className={`tool-section ${withDivider ? "section-divider" : ""}`}>
      <div className="site-container">
        <h2>{title}</h2>
        <p>{subtitle}</p>

        <div className="tool-grid">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
            />
          ))}
        </div>

        <button
          type="button"
          className="primary-btn"
          aria-label={`View all ${title} tools`}
          onClick={() => navigate(`/tools/${targetCategory}`)}
        >
          View All {title}
        </button>
      </div>
    </section>
  );
};

export default ToolSection;