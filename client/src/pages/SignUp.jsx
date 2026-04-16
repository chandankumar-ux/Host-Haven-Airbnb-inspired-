import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { signupUser } from "../app/features/authSlice";
import {useDispatch, } from "react-redux"
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  // const {user,login}=useSelector(state=>state.auth)
  const onSubmit = async(data) => {
    console.log("Signup data", data);
    const result=await dispatch(signupUser(data));
    console.log("fetched SignUp data--",result);
    if (result.meta.requestStatus === "fulfilled") {
        navigate("/auth/login");
      }
  };

  return (<>
    <AuthForm onSubmit={onSubmit} btnName="Sign In">
       {({ register, errors, watch }) => {
        // password ko realtime dekh rahe hain
        const password = watch("password");
        return (
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            register={register}
            error={errors.name?.message}
          />
          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            register={register}
            error={errors.name?.message}
          />

          <FormInput
            label="Phone"
            type="text"
            name="mobile"
            register={register}
            error={errors.phone?.message}
          />

          <div className="col-span-2">
            <FormInput
              label="Email"
              type="email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
          </div>

           {/* <div className="grid grid-cols-2 gap-4"> */}
            <FormInput
              label="Password"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword?.message}
            validation={{
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  }}              

          />
          {/* </div> */}
        </div>
      )}}
    </AuthForm>
            <div className="max-w-md mx-auto space-y-4">
              <a href="/auth/login" className="text-sm text-purple-600 hover:underline px-1">
                Already have an account? Login
              </a>
              <a href="/auth/forgot-password" className="text-sm text-purple-600 hover:underline px-1">
                Forgot Password?
              </a>
            </div>
    </>
  );
};

export default Signup;
