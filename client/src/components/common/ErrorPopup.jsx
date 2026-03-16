import "../../styles/errorPopup.css";
import { RxCross1 } from "react-icons/rx";

function ErrorPopup({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-overlay">
      <div className="error-popup">

        <div className="error-header">
          <h3>Error</h3>
          <button onClick={onClose}>
            <RxCross1 />
          </button>
        </div>

        <p className="error-message">{message}</p>

        <button className="error-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default ErrorPopup;