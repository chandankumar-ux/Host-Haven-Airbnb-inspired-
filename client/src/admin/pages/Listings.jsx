import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await api.get("/admin/houses");
      setListings(res.data.data);
    } catch (err) {
      console.error("Fetch listings error", err);
    }
  };

  const toggleListing = async (listing) => {
    try {
      setLoadingId(listing._id);

      const res = await api.patch(
        `/admin/houses/${listing._id}/toggle`
      );

      // 🔥 Optimistic update
      setListings((prev) =>
        prev.map((l) =>
          l._id === listing._id
            ? { ...l, isActive: res.data.data.isActive }
            : l
        )
      );
    } catch (err) {
      console.error("Toggle listing error", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Listings
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Host</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="p-4">{l.name}</td>
                <td className="p-4">
                  {l.owner?.firstName} {l.owner?.lastName}
                </td>
                <td className="p-4">₹{l.pricePerNight}</td>
                <td className="p-4">
                  {l.isActive ? (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Disabled
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    disabled={loadingId === l._id}
                    onClick={() => toggleListing(l)}
                    className={`px-3 py-1 rounded text-white ${
                      l.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } ${
                      loadingId === l._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loadingId === l._id
                      ? "Processing..."
                      : l.isActive
                      ? "Disable"
                      : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
