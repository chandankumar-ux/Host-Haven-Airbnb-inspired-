import { useForm } from "react-hook-form";

const AuthForm = ({ children, onSubmit, btnName }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange", // realtime validation (industry standard)
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100"
    >
      {/*
        children = function
        hum use call kar rahe hain
        aur saari RHF powers de rahe hain
      */}
      {children({
        register,
        errors,
        watch,
        setValue,
      })}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold shadow hover:opacity-90 transition"
      >
        {btnName}
      </button>
    </form>
  );
};

export default AuthForm;
