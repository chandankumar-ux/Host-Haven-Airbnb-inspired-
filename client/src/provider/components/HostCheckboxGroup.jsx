export default function HostCheckboxGroup({
  label,
  name,
  options,
  register,
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 hover:border-purple-400 transition cursor-pointer">
            <input type="checkbox" value={opt} {...register(name)} className="accent-purple-600" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
