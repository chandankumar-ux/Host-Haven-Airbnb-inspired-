import House from "../models/House.js";
import { BadRequestError, NotFoundError } from "../errors/AppError.js";

export const getSingleHouse = async (req, res, next) => {
  try {
    // const userId = req.authUserId;
    const { id } = req.params;

    // if (!userId) {
    //   return next(new BadRequestError("Provider not logged in"));
    // }

    if (!id) {
      return next(new BadRequestError("Listing id is required"));
    }

    // 🔐 Ownership check + fetch
    const house = await House.findById(id);

    if (!house) {
      return next(
        new NotFoundError("Listing not found or you are not authorized")
      );
    }

    return res.status(200).json(house);
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  try {
    // const userId = req.authUserId;
    
    // if (!userId) {
    //   return next(new BadRequestError("Provider not logged in"));
    // }
    console.log("running the querry");
    const listings = await House.find({})
    // console.log("listings--",listings);
    return res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const searchListings = async (req, res, next) => {
  try {
    const { place, guests } = req.query;

    const query = {};

    // 📍 Location search (partial match)
    if (place) {
      query.location = { $regex: place, $options: "i" };
    }

    // 👥 Guest capacity
    if (guests) {
      query.maxGuests = { $gte: Number(guests) };
    }

    const listings = await House.find(query)
      .where("isActive").equals(true)
      .populate("owner", "firstName profileImage");

    res.json(listings);
  } catch (err) {
    next(err);
  }
};
