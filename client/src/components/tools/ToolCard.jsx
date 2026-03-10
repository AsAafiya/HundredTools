import { Link } from "react-router-dom";

const ToolCard = ({ title, description, icon, path }) => {
  return (
  <Link to={path} className="tool-card">
    <div className="tool-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </Link>
  );
};

export default ToolCard;