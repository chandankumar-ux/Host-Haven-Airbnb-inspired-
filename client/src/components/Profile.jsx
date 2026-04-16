import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../app/features/authSlice";
import { verifyUser } from "../app/features/authSlice";

export default function Profile({ onClose }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/auth/login");
      onClose(); // profile dropdown band ho jaye
    }
  };
  const handleVerifyUSer=async()=>{
    const result=await dispatch(verifyUser());
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/auth/verify-user");
    }
  }

  if (!user) return null;

  return (
    <div className="absolute right-4 top-16 w-70 bg-white rounded-xl shadow-lg p-4 z-50 border">
      {/* User Info */}
      <div className="flex items-center gap-3 pb-3 border-b">
        <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
          {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full bg-linear-to-br"
                />
              ) : (
                user.firstName?.[0]?.toUpperCase() || "U"
              )}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
           
        </div>
      </div>

      {/* Options */}
      <div className="mt-3 space-y-2">
        {user.role==="host" &&<button
          onClick={() => {
            navigate("/host/my-profile");
            onClose();
          }}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          My Profile
        </button>
        }        
        {user.isVerified ?<p className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Verfied✔</p>:
        <button
          onClick={() => {
            handleVerifyUSer();
            onClose();
          }}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          Verify
        </button>
        }
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
