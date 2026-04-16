export default function HostSelect({
  label,
  name,
  options,
  register,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...register(name, { required: `${label} is required` })}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition bg-white shadow-sm"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
