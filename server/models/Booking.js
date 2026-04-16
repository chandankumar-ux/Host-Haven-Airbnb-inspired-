import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
    required: true,
  },

  checkInDate: {
    type: Date,
    required: true,
  },

  checkOutDate: {
    type: Date,
    required: true,
  },

  guestsCount: {
    type: Number,
    required: true,
    min: 1,
  },

  // 💰 Amount breakdown (VERY GOOD – keep it)
  total: {
    pricePerNight: { type: Number, required: true },
    nights: { type: Number, required: true },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
  },

  // 💳 Razorpay related fields (NEW)
  payment: {
    orderId: { type: String },      // razorpay_order_id
    paymentId: { type: String },    // razorpay_payment_id
    provider: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },
  },

  // 💸 Payment status
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },

  // 🏨 Booking lifecycle
  bookingStatus: {
    type: String,
    enum: [
      "pending",     // order created, payment not done
      "confirmed",   // payment verified
      "checked_in",
      "completed",
      "cancelled",
    ],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
