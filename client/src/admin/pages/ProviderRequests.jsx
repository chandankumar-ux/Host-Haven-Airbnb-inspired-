import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ProviderRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/provider-requests");
      console.log("result---",res);
            console.log("result data---",res.data.data);

      setRequests(res.data.data);
    } catch (err) {
      console.error("Fetch provider requests error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const response=await api.post(`/admin/provider/`,{userId:id,action:action});
      console.log(response);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Provider action error", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Provider Role Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">
          No pending provider requests
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">First Name</th>
                <th className="p-4 text-left">Second Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-4">{user.firstName}</td>
                  <td className="p-4">{user.secondName}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleAction(user._id, "approve")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(user._id, "reject")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
