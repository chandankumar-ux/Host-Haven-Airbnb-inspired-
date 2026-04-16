export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-5 rounded-xl text-white shadow ${color}`}>
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
