import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import { startPayment } from "../utils/razorpay";

import ImageGallery from "../components/ImageGallery";
import Amenities from "../components/Amenities";
import HostInfo from "../components/HostInfo";
import Reviews from "../components/Reviews";
import BookingCard from "../components/BookingCard";
import ListingMap from "../components/ListingMap";
import Loader from "../components/Loader";
import { fixLeafletIcon } from "../utils/fixLeafletIcon";

export default function ListingDetails() {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [listing, setListing] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);

  useEffect(() => {
    api.get(`/post/listings/${id}`).then(({ data }) => setListing(data));
  }, [id]);

  if (!listing) return <Loader />;

  const nights =
    checkInDate && checkOutDate
      ? Math.max(
          (new Date(checkOutDate) - new Date(checkInDate)) /
            (1000 * 60 * 60 * 24),
          1
        )
      : 1;

  const total = {
    pricePerNight: listing.pricePerNight,
    nights,
    cleaningFee: 500,
    serviceFee: 300,
    totalAmount:
      listing.pricePerNight * nights + 500 + 300,
  };

  const handleReserve = () => {
    if (!user) return navigate("/auth/login");
    if (!checkInDate || !checkOutDate)
      return alert("Select dates");

    startPayment({
      totalAmount: total.totalAmount,
      bookingData: {
        user: user._id,
        house: listing._id,
        checkInDate,
        checkOutDate,
        guestsCount,
        total,
      },
      navigate,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-1">{listing.name}</h1>
      <p className="text-gray-600 mb-6">{listing.location}</p>

      {/* GALLERY */}
      <ImageGallery images={listing.images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          <HostInfo host={listing.owner} />

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">
              About this place
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {listing.description}
            </p>
          </div>

          <Amenities amenities={listing.amenities} />

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">
              Location
            </h2>
            <ListingMap
              height="380px"
              lat={listing.coordinates.lat}
              long={listing.coordinates.long}
            />
          </div>

          <Reviews reviews={listing.reviews} />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <BookingCard
              pricePerNight={listing.pricePerNight}
              maxGuests={listing.maxGuests}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guestsCount={guestsCount}
              setGuestsCount={setGuestsCount}
              total={total}
              onReserve={handleReserve}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
