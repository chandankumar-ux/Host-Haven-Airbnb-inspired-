import Joi from "joi";

export const houseValidationSchema = Joi.object({
  //  BASIC INFO
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "House name is required",
      "string.min": "House name must be at least 3 characters",
    }),

  description: Joi.string()
    .trim()
    .max(1000)
    .optional(),

  category: Joi.string()
    .valid("Villa", "Apartment", "House", "Cottage")
    .required()
    .messages({
      "any.only": "Category must be Villa, Apartment, House or Cottage",
    }),

  //  PRICE & LOCATION
  pricePerNight: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be greater than 0",
    }),

  location: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Location is required",
    }),

  //  COORDINATES
  coordinates: Joi.object({
    lat: Joi.number()
      .min(-90)
      .max(90)
      .optional()
      .messages({
        "number.min": "Latitude must be >= -90",
        "number.max": "Latitude must be <= 90",
      }),
    long: Joi.number()
      .min(-180)
      .max(180)
      .optional()
      .messages({
        "number.min": "Longitude must be >= -180",
        "number.max": "Longitude must be <= 180",
      }),
  }).optional(),

  //  IMAGES (UPDATED STRUCTURE)
  images: Joi.object({
    bedroom: Joi.array()
      .items(Joi.string().uri())
      .optional(),

    bathroom: Joi.array()
      .items(Joi.string().uri())
      .optional(),

    kitchen: Joi.array()
      .items(Joi.string().uri())
      .optional(),

    exterior: Joi.array()
      .items(Joi.string().uri())
      .optional(),

    other: Joi.array()
      .items(Joi.string().uri())
      .optional(),
  }).optional(),

  //  AMENITIES & RULES
  amenities: Joi.array()
    .items(Joi.string().trim())
    .optional(),

  houseRules: Joi.string()
    .trim()
    .max(500)
    .optional(),

  //  PROPERTY DETAILS
  maxGuests: Joi.number()
    .integer()
    .positive()
    .optional(),

  bedrooms: Joi.number()
    .integer()
    .min(0)
    .optional(),

  baths: Joi.number()
    .integer()
    .min(0)
    .optional(),

  //  AVAILABILITY
  availability: Joi.array()
    .items(
      Joi.object({
        checkIn: Joi.date().required(),
        checkOut: Joi.date()
          .greater(Joi.ref("checkIn"))
          .required()
          .messages({
            "date.greater":
              "Check-out date must be after check-in date",
          }),
      })
    )
    .optional(),

  //  REVIEWS (optional, usually backend-handled)
  reviews: Joi.array()
    .items(Joi.string().hex().length(24))
    .optional(),
});
