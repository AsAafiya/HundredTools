import { Link } from "react-router-dom";

const ToolCard = ({ title, description, icon, path }) => {
  return (
    <Link to={path} className="tool-card" aria-label={`Open ${title}`}>
      <div className="tool-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default ToolCard;