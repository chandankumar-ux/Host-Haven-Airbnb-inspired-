import { useEffect, useState } from "react";
import api from "../../api/axios";
import StatCard from "../components/StatCard";
import Loader from "../../components/Loader";
export default function HostDashboard() {
  const [stats, setStats] = useState({
    listings: 0,
    bookings: 0,
    earnings: 0,
  });

  useEffect(() => {
      const fetchStats = async () => {
      try {
        console.log("sending req to stats");
        const res = await api.get("/host/dashboard-stats");
        console.log("res is--",res);
        console.log(res.data.data);
        setStats(res.data.data);
      } catch (err) {
        console.error("Dashboard stats error", err);
      }
    };

    fetchStats();
  }, []);
if(!stats){
  return <Loader text="Loading..."/>
}
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Host Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="My Listings" value={stats.listings} color="bg-blue-500" />
        <StatCard title="Bookings" value={stats.bookings} color="bg-green-500" />
        <StatCard title="Earnings" value={`${stats.earnings}`} color="bg-purple-500" />
      </div>
    </div>
  );
}
