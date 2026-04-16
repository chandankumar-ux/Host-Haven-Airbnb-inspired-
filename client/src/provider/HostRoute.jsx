import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HostRoute({ children }) {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((s) => s.auth);

  if (!isAuthChecked) return null; // or loader

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (user.role !== "provider") {
    // return <Navigate to="/" replace />;
  }

  return children;
}
