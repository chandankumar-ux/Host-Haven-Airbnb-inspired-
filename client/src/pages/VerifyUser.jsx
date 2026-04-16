import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../app/features/authSlice";
import { useNavigate } from "react-router-dom";
import OtpInput from "../components/OtpInput";
const VerifyUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
    const onSubmit = async(data) => {
    const otp = data.otp.join("");
    console.log("Email:", data.email);
    console.log("OTP:", otp);
    const result=await dispatch(verifyOtp(data));
        console.log("fetched VerifyUser data--",result);
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
          }
      };
  
  return (
    <AuthForm onSubmit={onSubmit} btnName="Verify">
      {({ register, errors, setValue }) => (
        <div className="space-y-6">

          {/* Email (pre-filled & readonly) */}
          <FormInput
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
            validation={{ required: true }}
            defaultValue={user.email}
            disabled
          />

          {/* OTP Section */}
          <div>
            <label className="block text-center mb-2">
              Enter 6-digit OTP
            </label>

            <OtpInput
              register={register}
              setValue={setValue}
              error={errors.otp}
            />
          </div>
        </div>
      )}
    </AuthForm>
  );
};


export default VerifyUser;
