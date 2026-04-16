import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Card({ id, img, title, address, price }) {
  return (
    <Link
      to={`/post/listings/${id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition relative"
    >
      <img
        className="w-full h-44 object-cover"
        src={img}
        alt={title}
      />

      <button
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-pink-100 transition"
        onClick={(e) => e.preventDefault()}
      >
        <FaRegHeart className="text-pink-500" />
      </button>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{title}</h3>
          <div className="text-sm text-yellow-500">★ 4.8</div>
        </div>

        <p className="text-sm text-gray-500 truncate">
          {address}
        </p>

        <div className="mt-2 font-bold">
          ₹{price}{" "}
          <span className="text-sm font-normal text-gray-500">
            / night
          </span>
        </div>
      </div>
    </Link>
  );
}
