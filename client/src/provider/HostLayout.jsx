import { Outlet } from "react-router-dom";
import HostSidebar from "./components/HostSidebar";
import GlobalLoader from "../components/GlobalLoader";

export default function HostLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <HostSidebar />
      <main className="flex-1 p-6">
        <GlobalLoader>
          <Outlet />
        </GlobalLoader>
      </main>
    </div>
  );
}
