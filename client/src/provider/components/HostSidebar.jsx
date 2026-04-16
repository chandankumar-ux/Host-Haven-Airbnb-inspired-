import { NavLink } from "react-router-dom";

export default function HostSidebar() {
  const cls = "px-4 py-2 rounded hover:bg-gray-200 transition";

  return (
    <aside className="w-64 bg-white shadow-md">
      <h1 className="text-xl font-bold p-4 border-b">
        Host Panel
      </h1>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/" className={cls}>
          Home
        </NavLink>
        <NavLink to="/host/dashboard" className={cls}>
          Dashboard
        </NavLink>
        <NavLink to="/host/listings" className={cls}>
          My Listings
        </NavLink>
        <NavLink to="/host/listings/create" className={cls}>
          Create Listing
        </NavLink>
        <NavLink to="/host/bookings" className={cls}>
          Bookings
        </NavLink>
      </nav>
    </aside>
  );
}
