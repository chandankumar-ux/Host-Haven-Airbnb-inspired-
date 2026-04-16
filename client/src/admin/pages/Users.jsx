import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error("Fetch users error", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Block / Unblock handler
  const toggleBlock = async (user) => {
    try {
      setActionLoading(user._id);

      const action = user.isBlocked ? "unblock" : "block";

      await api.patch("/admin/users", {
        userId: user._id,
        action: action,
      });

      // Optimistic UI update (fast & clean)
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? { ...u, isBlocked: !u.isBlocked }
            : u
        )
      );
    } catch (err) {
      console.error("Block user error", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Users</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">First Name</th>
              <th className="p-4 text-left">Last Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-4">{u.firstName}</td>
                <td className="p-4">{u.lastName}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.role}</td>
                <td className="p-4">
                  {u.isBlocked ? (
                    <span className="text-red-600 font-medium">
                      Blocked
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    disabled={actionLoading === u._id}
                    onClick={() => toggleBlock(u)}
                    className={`px-3 py-1 rounded text-white ${
                      u.isBlocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } ${
                      actionLoading === u._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {actionLoading === u._id
                      ? "Processing..."
                      : u.isBlocked
                      ? "Unblock"
                      : "Block"}
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
