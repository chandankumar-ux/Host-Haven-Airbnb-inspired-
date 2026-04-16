import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// main pages
import Home from "../pages/Home";
import NotFound from "../pages/Error";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import About from "../pages/About";
import Contact from "../pages/Contact";

// users
import VerifyUser from "../pages/VerifyUser";
import ResetPassword from "../pages/ResetPassword";
import ResetOtpRequest from "../pages/ResetOtpRequest";
import HostForm from "../pages/HostForm";
import PrivateRoute from "../layouts/PrivateRoute";

// admin
import AdminLayout from "../admin/AdminLayout";
import AdminRoute from "../admin/AdminRoute";
import Dashboard from "../admin/pages/Dashboard";
import ProviderRequests from "../admin/pages/ProviderRequests";
import Users from "../admin/pages/Users";
import Listings from "../admin/pages/Listings";
import Bookings from "../admin/pages/Bookings";

//Provider
import HostRoute from "../provider/HostRoute";
import HostLayout from "../provider/HostLayout";
import HostDashboard from "../provider/pages/HostDashboard";
import HostListings from "../provider/pages/HostListings"
import CreateListing from "../provider/pages/CreateListing";
import EditListing from "../provider/pages/EditListing";
import HostBookings from "../provider/pages/HostBookings";

//Payments
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import MyBookings from "../pages/MyBookings";
import BookingDetails from "../pages/BookingDetails";

//Post
import ListingDetails from "../pages/ListingDetails";
import SearchResults from "../pages/SearchResults";


const router = createBrowserRouter([
  //  USER / PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      { path: "auth/login", element: <Login /> },
      { path: "auth/signup", element: <Signup /> },

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      // user auth flows
      { path: "auth/verify-user", element: <VerifyUser /> },
      { path: "auth/forgot-password", element: <ResetOtpRequest /> },
      { path: "auth/forgot-password-otp", element: <ResetPassword /> },
      { path: "post/listings/:id", element: <ListingDetails /> },
      { path: "/payment/success", element: <PaymentSuccess />},
      { path: "/payment/failed", element: <PaymentFailed />},
      {path:"/user/my-bookings", element: <MyBookings/>},
      {path:"/bookings/:id", element:<BookingDetails/>},
      {path:"search",element:<SearchResults/>},

      // host
      {
        path: "become-host",
        element: (
          <PrivateRoute>
            <HostForm />
          </PrivateRoute>
        ),
      },
    ],
  },

  //  ADMIN ROUTES (SEPARATE BRANCH)
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "providers", element: <ProviderRequests /> },
      { path: "users", element: <Users /> },
      { path: "listings", element: <Listings /> },
      { path: "bookings", element: <Bookings /> },
    ],
  },
  {
  path: "/host",
  element: (
    <HostRoute>
      <HostLayout />
    </HostRoute>
  ),
  children: [
    { path: "dashboard", element: <HostDashboard /> },
    { path: "listings", element: <HostListings /> },
    { path: "listings/create", element: <CreateListing /> },
    { path: "listings/:id/edit", element: <EditListing /> },
    { path: "bookings", element: <HostBookings /> },
  ],
}

]);

export default router;
