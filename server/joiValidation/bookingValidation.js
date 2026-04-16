import Joi from "joi";

export const bookingValidationSchema = Joi.object({
  //  User & House
  user: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.base": "User ID must be a string",
      "string.length": "Invalid User ID",
      "any.required": "User is required",
    }),

  house: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.length": "Invalid House ID",
      "any.required": "House is required",
    }),

  //  Dates
  checkInDate: Joi.date()
    .required()
    .messages({
      "date.base": "Check-in date must be valid",
      "any.required": "Check-in date is required",
    }),

  checkOutDate: Joi.date()
    .greater(Joi.ref("checkInDate"))
    .required()
    .messages({
      "date.greater": "Check-out must be after check-in",
      "any.required": "Check-out date is required",
    }),

  //  Guests
  guestsCount: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.min": "At least 1 guest required",
      "any.required": "Guests count is required",
    }),

  // 💰 Amount breakdown
  total: Joi.object({
    pricePerNight: Joi.number()
      .positive()
      .required(),

    nights: Joi.number()
      .integer()
      .min(1)
      .required(),

    cleaningFee: Joi.number()
      .min(0)
      .optional(),

    serviceFee: Joi.number()
      .min(0)
      .optional(),

    totalAmount: Joi.number()
      .positive()
      .required(),
  })
    .required()
    .messages({
      "any.required": "Total amount details are required",
    }),

  // 💳 Razorpay payment info (backend controlled)
  payment: Joi.object({
    orderId: Joi.string().optional(),
    paymentId: Joi.string().optional(),
    provider: Joi.string()
      .valid("razorpay")
      .default("razorpay"),
  }).optional(),

  // 💸 Payment status
  paymentStatus: Joi.string()
    .valid("pending", "paid", "failed", "refunded")
    .default("pending"),

  // 🏨 Booking lifecycle
  bookingStatus: Joi.string()
    .valid(
      "pending",
      "confirmed",
      "checked_in",
      "completed",
      "cancelled"
    )
    .default("pending"),
});
