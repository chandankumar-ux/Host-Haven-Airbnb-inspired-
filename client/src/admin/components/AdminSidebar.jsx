import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkClass =
    "px-4 py-2 rounded hover:bg-gray-200 transition";

  return (
    <aside className="w-64 bg-white shadow-md">
      <h1 className="text-xl font-bold p-4 border-b">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-2 p-4">
         <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/providers" className={linkClass}>
          Provider Requests
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/listings" className={linkClass}>
          Listings
        </NavLink>
        <NavLink to="/admin/bookings" className={linkClass}>
          Bookings
        </NavLink>
      </nav>
    </aside>
  );
}
