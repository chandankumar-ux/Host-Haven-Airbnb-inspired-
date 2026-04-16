export default function BookingCard({
  pricePerNight,
  maxGuests,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guestsCount,
  setGuestsCount,
  total,
  onReserve,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-xl p-6">
      <p className="text-2xl font-semibold mb-4">
        ₹{pricePerNight}
        <span className="text-sm text-gray-500"> / night</span>
      </p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="input"
        />
      </div>

      <select
        value={guestsCount}
        onChange={(e) => setGuestsCount(+e.target.value)}
        className="input mb-4"
      >
        {Array.from({ length: maxGuests }, (_, i) => (
          <option key={i + 1}>{i + 1} guest</option>
        ))}
      </select>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>
            ₹{pricePerNight} × {total.nights} nights
          </span>
          <span>₹{pricePerNight * total.nights}</span>
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

      <button
        onClick={onReserve}
        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold"
      >
        Reserve
      </button>

      <p className="text-center text-sm text-gray-500 mt-2">
        You won’t be charged yet
      </p>
    </div>
  );
}
