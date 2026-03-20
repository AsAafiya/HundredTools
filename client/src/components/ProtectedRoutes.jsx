import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth"; // JWT token check

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    // Agar user logged out hai → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Agar user logged in hai → requested page render
  return children;
};

export default ProtectedRoute;