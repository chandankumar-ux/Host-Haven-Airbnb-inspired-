import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import ListingMap from "../components/ListingMap";
import HostInfo from "../components/HostInfo";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/bookings/${id}`);
        console.log("data details--",data);
        setBooking(data);
      } catch (err) {
        navigate("/my-bookings");
      }
    };
    load();
  }, [id, navigate]);

  if (!booking) return <Loader />;

  const { house, user, total } = booking;

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Booking Details
        </h1>
        <p className="text-gray-500">
          Booking ID: {booking._id}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROPERTY INFO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">
              {house.name}
            </h2>
            <p className="text-gray-600 mb-3">
              {house.location}
            </p>

            <img
              src={
                house.images?.exterior?.[0] ||
                house.images?.bedroom?.[0] ||
                "https://via.placeholder.com/600x400"
              }
              alt={house.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* HOST INFO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <HostInfo host={house.owner} />
          </div>

          {/* MAP */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3">
              Location
            </h2>
            <ListingMap
              height="300px"
              lat={house.coordinates.lat}
              long={house.coordinates.long}
            />
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="space-y-6">
          {/* BOOKING SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">
              Booking Summary
            </h3>

            <div className="text-sm space-y-2">
              <p>
                <strong>Check-in:</strong>{" "}
                {new Date(booking.checkInDate).toDateString()}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {new Date(booking.checkOutDate).toDateString()}
              </p>
              <p>
                <strong>Guests:</strong>{" "}
                {booking.guestsCount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">
                  {booking.bookingStatus}
                </span>
              </p>
              <p>
                <strong>Payment:</strong>{" "}
                {booking.paymentStatus}
              </p>
            </div>

            <hr className="my-4" />

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>
                  ₹{total.pricePerNight} × {total.nights} nights
                </span>
                <span>
                  ₹{total.pricePerNight * total.nights}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>₹{total.cleaningFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>₹{total.serviceFee}</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (future ready) */}
          <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
              onClick={() =>
                alert("Chat feature coming soon")
              }
            >
              Message Host
            </button>

            {booking.bookingStatus === "completed" && (
              <button
                className="w-full border py-2 rounded-lg"
                onClick={() =>
                  alert("Review feature coming soon")
                }
              >
                Leave a Review
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
