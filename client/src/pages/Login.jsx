import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../app/features/authSlice";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const [blockedError, setBlockedError] = useState("");

  const onSubmit = async (data) => {
    setBlockedError(""); // reset old error

    const result = await dispatch(loginUser(data));

    // ❌ login failed
    if (result.meta.requestStatus !== "fulfilled") {
      return;
    }

    const loggedInUser =
      result.payload?.user || result.payload;

    // 🚫 BLOCKED USER CHECK
    if (loggedInUser?.isBlocked === true) {
      setBlockedError(
        "Your account has been blocked. Please contact support."
      );
      return;
    }

    // 🔐 ROLE BASED REDIRECT
    if (loggedInUser?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <>
      <AuthForm onSubmit={onSubmit} btnName="Login">
        {({ register, errors }) => (
          <>
            {/* 🚫 Blocked Message */}
            {blockedError && (
              <p className="text-red-600 text-sm mb-2">
                {blockedError}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label="Email"
                type="email"
                name="email"
                register={register}
                error={errors.email?.message}
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                register={register}
                error={errors.password?.message}
              />
            </div>
          </>
        )}
      </AuthForm>

      <div className="max-w-md mx-auto space-y-4">
        <a
          href="/auth/signup"
          className="text-sm text-purple-600 hover:underline px-1"
        >
          Don’t have an account? Sign Up
        </a>

        <a
          href="/auth/forgot-password"
          className="text-sm text-purple-600 hover:underline px-1"
        >
          Forgot Password?
        </a>
      </div>
    </>
  );
};

export default Login;
