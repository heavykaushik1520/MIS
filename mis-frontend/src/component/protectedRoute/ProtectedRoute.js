import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userEmail = localStorage.getItem("userEmail");

  return userEmail ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
