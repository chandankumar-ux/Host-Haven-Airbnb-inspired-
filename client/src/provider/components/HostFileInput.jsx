export default function HostFileInput({ label, name, register }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register(name)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition bg-white shadow-sm"
      />
    </div>
  );
}
