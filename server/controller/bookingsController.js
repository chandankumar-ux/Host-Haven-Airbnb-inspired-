import Booking from "../models/Booking.js";
import { BadRequestError, NotFoundError } from "../errors/AppError.js";

export const getBookingDetails = async (req, res, next) => {
  try {
    const userId = req.authUserId;
    const bookingId = req.params.id;

    if (!userId) {
      return next(new BadRequestError("User not authenticated"));
    }

    if (!bookingId) {
      return next(new BadRequestError("Booking ID is required"));
    }

    const booking = await Booking.findById(bookingId)
      .populate("house", "name location images pricePerNight owner coordinates")
      .populate("user", "firstName lastName email");

    if (!booking) {
      return next(new NotFoundError("Booking not found"));
    }

    // 🔐 SECURITY CHECK
    // Only booking user OR provider (house owner) can see details
    const isUser =
      booking.user._id.toString() === userId.toString();
    const isProvider =
      booking.house.owner.toString() === userId.toString();

    if (!isUser && !isProvider) {
      return next(
        new BadRequestError("You are not allowed to view this booking")
      );
    }

    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};
