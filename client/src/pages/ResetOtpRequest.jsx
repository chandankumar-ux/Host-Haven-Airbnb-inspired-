import { requestPasswordReset } from "../app/features/authSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import AuthForm from "../components/AuthForm"
import FormInput from "../components/FormInput"

const ResetOtpRequest=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
  // const {user,login}=useSelector(state=>state.auth)
    const onSubmit = async(data) => {
    console.log("Reset Otp request data", data);
    const result=await dispatch(requestPasswordReset(data));
    console.log("fetched Reset Otp request data--",result);
    if (result.meta.requestStatus === "fulfilled") {
        navigate("/auth/forgot-password-otp");
      }
  };
    return(
        <AuthForm onSubmit={onSubmit} btnName="Send Otp">
                 {({ register, errors, watch }) => (

            <FormInput
              label="Email"
              type="email"
              name="email"
              register={register}
              error={errors.email?.message}
            />)}
            </AuthForm>
    )
} 
export default ResetOtpRequest;