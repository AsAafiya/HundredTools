import ToolCard from "./ToolCard";

const ToolSection = ({ title, subtitle, tools, withDivider = false }) => {
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

        <button className="primary-btn">
          View All {title}
        </button>
      </div>
    </section>
  );
};

export default ToolSection;