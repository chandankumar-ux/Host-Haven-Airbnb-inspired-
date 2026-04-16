import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

export default function HostBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/host/bookings")
      .then(res => setBookings(res.data))
      .catch(console.error);
  }, []);
if(!bookings){
  return <Loader text="Loading..."/>
}
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Bookings on My Listings
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Guest</th>
              <th className="p-4 text-left">Listing</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id} className="border-t">
                <td className="p-4">{b.user?.name}</td>
                <td className="p-4">{b.listing?.title}</td>
                <td className="p-4">₹{b.totalAmount}</td>
                <td className="p-4">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
