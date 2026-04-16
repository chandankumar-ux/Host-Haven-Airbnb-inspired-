import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import GlobalLoader from "../components/GlobalLoader";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <GlobalLoader>
          <Outlet />
        </GlobalLoader>
      </main>
    </div>
  );
}
