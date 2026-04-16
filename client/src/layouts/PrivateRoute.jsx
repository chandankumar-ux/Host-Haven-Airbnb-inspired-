import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../app/features/authSlice";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // dispatch(checkAuth());
     console.log("user---",user);
  if (!user) {
     navigate("/auth/login");
  }
  }, [dispatch]);
   

  return children;
};

export default PrivateRoute;
