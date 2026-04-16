import { useNavigate, useSearchParams } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const reason = searchParams.get("reason");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-semibold mb-2">
          Payment Failed 😕
        </h1>

        <p className="text-gray-600 mb-4">
          Unfortunately, your payment could not be completed.
        </p>

        {reason && (
          <p className="text-sm text-red-500 mb-4">
            Reason: {reason}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
