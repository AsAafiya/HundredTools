const ToolCard = ({ title, description, icon }) => {
  return (
    <div className="tool-card">
      <div className="tool-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ToolCard;