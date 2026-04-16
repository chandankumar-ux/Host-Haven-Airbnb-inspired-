import Joi from "joi";

export const userValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(25)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),
    lastName: Joi.string()
    .trim()
    .max(25)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      "string.email": "Please enter a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  mobile: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid phone number",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),

  role: Joi.string()
    .valid("user", "provider", "admin")
    .default("user"),

  profileImage: Joi.string().allow(""),

  wishlist: Joi.array().items(
    Joi.string().hex().length(24) // MongoDB ObjectId
  ),

  bookings: Joi.array().items(
    Joi.string().hex().length(24)
  ),

  verifyOtp: Joi.string().allow(""),
  verifyOtpExpireAt: Joi.number().default(0),

  resetOtp: Joi.string().allow(""),
  resetOtpExpireAt: Joi.number().default(0),

  isVerified: Joi.boolean().default(false),
  isHostVerified: Joi.boolean().default(false),

  kycDocs: Joi.array().items(
    Joi.object({
      docType: Joi.string().required(),
      docUrl: Joi.string().uri().required(),
      status: Joi.string()
        .valid("pending", "approved", "rejected")
        .default("pending"),
    })
  ),

  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});
