import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("Authorization") == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
