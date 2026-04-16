import { FaStar } from "react-icons/fa";

export default function Reviews({ reviews = [] }) {
  if (!reviews.length) return null;

  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        <FaStar className="inline text-yellow-400" /> {avg.toFixed(1)} ·{" "}
        {reviews.length} reviews
      </h2>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r._id}>
            <p className="font-medium">{r.user.firstName}</p>
            <p className="text-sm text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
