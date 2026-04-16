import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>

      <p className="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium"
      >
        Go back home
      </Link>
    </div>
  );
}
