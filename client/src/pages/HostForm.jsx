import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { useSelector } from "react-redux";
import api from "../api/axios";


const HostForm = () => {
  const { user } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      console.log("FORM DATA 👉", data); // debug

      const formData = new FormData();

      // basic info (optional – backend already knows user)
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("mobile", user.mobile);

      // files (MOST IMPORTANT)
      formData.append("aadhar", data.aadhar[0]);
      formData.append("pan", data.pan[0]);
      formData.append("photo", data.photo[0]);

      if (data.profileImage?.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
      }
      const result=await api.post(
        "http://localhost:8080/api/users/become-host",
        formData,
      );
      alert("Host request submitted successfully. Verification pending.");
      console.log("fetched data of Hostform--", result);

    } catch (error) {
      console.error("HOST FORM ERROR 👉", error);
      alert("Something went wrong");
    }
  };

  return (
    <AuthForm onSubmit={onSubmit} btnName="Become a Host">
      {({ register, errors }) => (
        <>
          {/* ================= BASIC INFO ================= */}
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            register={register}
            defaultValue={user?.firstName}
            disabled
          />

          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            register={register}
            defaultValue={user?.lastName}
            disabled
          />

          <FormInput
            label="Mobile Number"
            type="text"
            name="mobile"
            register={register}
            defaultValue={user?.mobile}
            disabled
          />

          {/* ================= FILE INPUTS ================= */}
          {/*  File inputs = DIRECT input */}

          <div className="flex flex-col gap-1">
            <label>Aadhar Card *</label>
            <input
              type="file"
              {...register("aadhar", { required: "Aadhar is required" })}
            />
            {errors.aadhar && (
              <span className="text-red-500 text-sm">
                {errors.aadhar.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>PAN Card *</label>
            <input
              type="file"
              {...register("pan", { required: "PAN is required" })}
            />
            {errors.pan && (
              <span className="text-red-500 text-sm">
                {errors.pan.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Passport Size Photo *</label>
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
            />
            {errors.photo && (
              <span className="text-red-500 text-sm">
                {errors.photo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Profile Image (optional)</label>
            <input type="file" {...register("profileImage")} />
          </div>
        </>
      )}
    </AuthForm>
  );
};

export default HostForm;
