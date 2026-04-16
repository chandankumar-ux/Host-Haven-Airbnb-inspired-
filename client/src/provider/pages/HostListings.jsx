import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

export default function HostListings() {
  const [listings, setListings] = useState([]);

  const load = async () => {
    const { data } = await api.get("/host/listings");
    setListings(data);
  };

  useEffect(() => {
    load();
  }, []);
  if(!listings){
    return <Loader text="Loading..."/>
  }
  const remove = async (id) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    await api.delete(`/host/listings/${id}`);
    load();
  };

  return (
    <section className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Listings</h1>

        <Link
          to="/host/listings/create"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:opacity-90"
        >
          + Add Listing
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">Listing</th>
              <th className="p-4 text-left">Price / night</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No listings yet
                </td>
              </tr>
            )}

            {listings.map((l) => (
              
              <tr
                key={l._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Title */}
                
                <td className="p-4">
                  <Link
                    to={`/post/listings/${l._id}`}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    {l.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {l.location}
                  </p>
                </td>

                {/* Price */}
                <td className="p-4 font-semibold text-gray-800">
                  ₹{l.pricePerNight}
                </td>

                {/* Actions */}
                <td className="p-4 flex justify-end gap-2">
                  <Link
                    to={`/host/listings/${l._id}/edit`}
                    className="px-3 py-1.5 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => remove(l._id)}
                    className="px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
