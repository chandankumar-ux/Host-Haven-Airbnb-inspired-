import { NavLink, useNavigate } from "react-router-dom";
import { checkAuth } from "../app/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Profile from "./Profile";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  console.log("user",user?.role);
  const destination=(user?.role==="provider")?"/host/dashboard":"/become-host";
  const goToExplore = () => {
  navigate("/", {
    state: { scrollTo: "popular" },
  });
};
  return (
    <div className="mx-auto my-1 bg-white/80 backdrop-blur-lg rounded-3xl px-4 py-2 flex items-center justify-between shadow-lg w-full relative">
      
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-3 font-extrabold text-lg">
        <div className="w-9 h-9 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 grid place-items-center text-white shadow">
          ⛱
        </div>
        Sthaan
      </NavLink>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={goToExplore}
          className="text-md font-medium hover:text-blue-600"
        >
          Explore
        </button>


        <NavLink to={destination} className="text-md font-medium hover:text-blue-600">
          Host
        </NavLink>

        {/* ✅ ADMIN LINK */}
        {user?.role === "admin" && (
          <NavLink
            to="/admin/dashboard"
            className="text-md font-semibold text-red-600 hover:underline"
          >
            Admin
          </NavLink>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 relative">
        {/* Dark mode */}
        <button aria-label="Toggle dark mode" className="text-xl px-2">
          <i className="fa-solid fa-moon"></i>
        </button>

        {/* Not logged in */}
        {!user && (
          <>
            <button
              onClick={() => navigate("/auth/login")}
              className="text-sm font-medium"
            >
              Log in
            </button>

            <button
              onClick={() => navigate("/auth/signup")}
              className="text-sm font-semibold px-3 py-2 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white"
            >
              Sign up
            </button>
          </>
        )}

        {/* Logged in */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold shadow overflow-hidden"
            >
              {/* ✅ PROFILE IMAGE FIX */}
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user.firstName?.[0]?.toUpperCase() || "U"
              )}
            </button>

            {isProfileOpen && (
              <Profile onClose={() => setIsProfileOpen(false)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
