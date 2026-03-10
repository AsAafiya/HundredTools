import "../../styles/authModel.css";
import { RxCross1 } from "react-icons/rx";

function AuthModal({ children, onClose }) {
  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        <button className="close-btn" onClick={onClose}>
          <RxCross1 />
        </button>

        {children}

      </div>
    </div>
  );
}

export default AuthModal;