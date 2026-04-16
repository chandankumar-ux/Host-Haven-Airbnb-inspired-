import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get("bookingId");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-semibold mb-2">
          Booking Confirmed 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was successful and your booking has been confirmed.
        </p>

        {bookingId && (
          <p className="text-sm text-gray-500 mb-4">
            Booking ID: <span className="font-medium">{bookingId}</span>
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/user/my-bookings")}
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            View My Bookings
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
