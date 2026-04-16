import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Booking from "../models/Booking.js";

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const { totalAmount } = req.body;
    console.log("running creating order----");
    //  frontend amount blindly trust nahi
    if (!totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }
    console.log("running creating order----");

    // Razorpay expects amount in paise
    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });
    console.log("running creating order----");

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};


export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = req.body;

    // Razorpay verification rule
    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ Payment real hai → booking create karo
    const booking = await Booking.create({
      ...bookingData,
      payment: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        provider: "razorpay",
      },
      paymentStatus: "paid",
      bookingStatus: "confirmed",
    });

    res.json({
      success: true,
      message: "Payment successful",
      booking,
    });
  } catch (err) {
    next(err);
  }
};
