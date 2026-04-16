import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/admin/bookings");
      console.log("booking response--", res);
      setBookings(
        Array.isArray(res.data.data) ? res.data.data : []
      );
    } catch (err) {
      console.error("Fetch bookings error", err);
      setBookings([]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Bookings
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Listing</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(bookings) && bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-4">{b.user?.name}</td>
                <td className="p-4">{b.listing?.title}</td>
                <td className="p-4">₹{b.totalAmount}</td>
                <td className="p-4">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
