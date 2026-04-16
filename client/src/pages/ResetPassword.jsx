import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import OtpInput from "../components/OtpInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../app/features/authSlice";
import { useEffect } from "react";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { resetEmail } = useSelector((state) => state.auth);
    console.log("user-",resetEmail);
    useEffect(() => {
  if (!resetEmail) {
    navigate("/auth/forgot-password");
  }
}, [resetEmail]);

  const onSubmit = async(formData) => {
     const fullOtp = formData.otp.join(""); // array → string
    // console.log("OTP:", fullOtp);
    formData.otp=fullOtp;
    console.log("Reset Otp request data", formData);
    const result=await dispatch(resetPassword(formData));
    console.log("fetched reset Password data--",result);
    if (result.meta.requestStatus === "fulfilled") {
        navigate("/auth/login");
      }

  };

  return (
    <AuthForm onSubmit={onSubmit} btnName="Reset">
      {({ register, errors, setValue,watch }) => (
        <div className="space-y-6">
          {/* Email */}
          <FormInput
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
            validation={{ required: true }}
            defaultValue={resetEmail}
            disabled
          />

          {/* OTP */}
          <div>
            <label className="block text-center mb-2">
              Enter 6-digit OTP
            </label>

            <OtpInput
              register={register}
              setValue={setValue}
              error={errors.otp}
            />
            <FormInput
                          label="New Password"
                          type="password"
                          name="newPassword"
                          register={register}
                          error={errors.newPassword?.message}
                        />
            
                      <FormInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        register={register}
                        error={errors.confirmPassword?.message}
                        validation={{
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              }}              
            
                      />
          </div>
        </div>
      )}
    </AuthForm>
  );
};

export default ResetPassword;
