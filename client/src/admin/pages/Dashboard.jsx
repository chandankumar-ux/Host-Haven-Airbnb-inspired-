import { useEffect, useState } from "react";
import api from "../../api/axios";
import StatCard from "../components/StatCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    pendingProviders: 0,
    listings: 0,
    bookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("sending req to stats");
        const res = await api.get("/admin/dashboard-stats");
        console.log("res is--",res);
        console.log(res.data.stats);
        setStats(res.data.stats);
      } catch (err) {
        console.error("Dashboard stats error", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Users" value={stats.users} color="bg-blue-500" />
        <StatCard title="Providers" value={stats.providers} color="bg-green-500" />
        <StatCard
          title="Pending Requests"
          value={stats.pendingProviders}
          color="bg-yellow-500"
        />
        <StatCard title="Listings" value={stats.listings} color="bg-purple-500" />
        <StatCard title="Bookings" value={stats.bookings} color="bg-pink-500" />
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <Link
          to="/admin/providers"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <h3 className="font-semibold text-lg">
            Provider Requests
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Approve or reject providers
          </p>
        </Link>
      </div>
    </div>
  );
}
