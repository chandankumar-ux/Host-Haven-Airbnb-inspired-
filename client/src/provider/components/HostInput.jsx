export default function HostInput({
  label,
  name,
  type = "text",
  step,
  register,
  error,
  required,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        step={step}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400 bg-white shadow-sm"
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
