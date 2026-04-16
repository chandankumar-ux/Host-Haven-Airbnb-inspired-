import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function MyBookings() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/users/bookings");
      console.log("daata",data);
      setBookings(data);
    };
    load();
  }, []);

  if (!bookings) return <Loader />;

  if (!bookings.length) {
    return <p className="text-center mt-10">No bookings yet</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded-xl p-4 flex justify-between items-center bg-white shadow"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {b.house.name}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(b.checkInDate).toDateString()} →{" "}
                {new Date(b.checkOutDate).toDateString()}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span className="font-medium">
                  {b.bookingStatus}
                </span>
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹{b.total.totalAmount}
              </p>

              <Link
                to={`/bookings/${b._id}`}
                className="text-indigo-600 text-sm hover:underline"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
