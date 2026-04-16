import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function HostForm({ title, onSubmit, children, defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔥 THIS IS THE KEY FIX
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl bg-white p-10 rounded-2xl shadow-xl space-y-8 border border-gray-100"
      encType="multipart/form-data"
    >
      <h1 className="text-2xl font-semibold mb-4 text-purple-700">{title}</h1>

      {children({ register, errors })}

      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 rounded font-semibold shadow hover:opacity-90 transition"
      >
        Save Changes
      </button>
    </form>
  );
}
