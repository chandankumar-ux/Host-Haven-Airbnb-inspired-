import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector(
    (state) => state.auth
  );

  // ⏳ Jab tak backend auth decide na ho
  if (!isAuthChecked) {
    return null; // ya loader
  }

  // ❌ Not logged in
  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ❌ Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin allowed
  return children;
}
