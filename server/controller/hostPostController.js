import mongoose from "mongoose";
import House from "../models/House.js";
import Booking from "../models/Booking.js";
import { BadRequestError,NotFoundError } from "../errors/AppError.js";

const formatINR = (amount) => {
  return "₹" + new Intl.NumberFormat("en-IN").format(amount);
};

export const hostDashboardStats = async (req, res, next) => {
  try {
    const userId = req.authUserId;

    if (!userId) {
      return next(new BadRequestError("Provider is not logged in"));
    }

    // 1 Total houses (listings)
    const totalHouses = await House.countDocuments({
      owner: userId,
    });

    // 2 Aggregate bookings + earnings
    const stats = await Booking.aggregate([
      {
        $lookup: {
          from: "houses",
          localField: "house",
          foreignField: "_id",
          as: "house",
        },
      },
      { $unwind: "$house" },
      {
        $match: {
          "house.owner": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalEarnings: {
            $sum: { $ifNull: ["$total.totalAmount", 0] },
          },
        },
      },
    ]);

    // 3 Safe fallback
    const bookings = stats.length > 0 ? stats[0].totalBookings : 0;
    const rawEarnings = stats.length > 0 ? stats[0].totalEarnings : 0;

    return res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      data: {
        listings: totalHouses,
        bookings,
        earnings: formatINR(rawEarnings), //  INR formatted
      },
    });
  } catch (err) {
    next(err);
  }
};

//READ
export const getHostListings = async (req, res, next) => {
  try {
    const userId = req.authUserId;
    
    if (!userId) {
      return next(new BadRequestError("Provider not logged in"));
    }
    console.log("running the querry");
    const listings = await House.find({ owner: userId })
      .select("name pricePerNight createdAt")
      .sort({ createdAt: -1 });
    // console.log("listings--",listings);
    return res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

//Create
export const createListing = async (req, res, next) => {
  try {
    const userId = req.authUserId;

    if (!userId) {
      return next(new BadRequestError("Provider not logged in"));
    }
    console.log("req.body is----",req.body);
    // ✅ REQUIRED COORDINATES
    const latRaw = req.body.coordinates.lat;
    const longRaw = req.body.coordinates.long;
    // const latRaw = req.body["coordinates[lat]"];
    // const longRaw = req.body["coordinates[long]"];
    console.log("lat--",latRaw);
    console.log("lon--",longRaw);

    if (!latRaw || !longRaw) {
      return next(
        new BadRequestError("Latitude and Longitude are required")
      );
    }

    const lat = Number(latRaw);
    const long = Number(longRaw);

    console.log("lat--",lat);
    console.log("lon--",long);

    if (Number.isNaN(lat) || Number.isNaN(long)) {
      return next(
        new BadRequestError("Latitude and Longitude must be valid numbers")
      );
    }
    console.log("after NaN");
    console.log("lat--",lat);
    console.log("lon--",long);
    const images = {
      bedroom: req.files?.bedroomImages?.map(f => f.path) || [],
      bathroom: req.files?.bathroomImages?.map(f => f.path) || [],
      kitchen: req.files?.kitchenImages?.map(f => f.path) || [],
      exterior: req.files?.exteriorImages?.map(f => f.path) || [],
      other: req.files?.otherImages?.map(f => f.path) || [],
    };

    const payload = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      pricePerNight: Number(req.body.pricePerNight),
      location: req.body.location,
      amenities: req.body.amenities,
      houseRules: req.body.houseRules,
      maxGuests: req.body.maxGuests,
      bedrooms: req.body.bedrooms,
      baths: req.body.baths,
      images,
      owner: userId,
      coordinates: { lat, long }, //  guaranteed valid
    };

    console.log("sending the req to create in mongodb");
    const house = await House.create(payload);
    console.log("Saved");
    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: house,
    });
  } catch (err) {
    next(err);
  }
};

//Delete
export const deleteListing = async (req, res, next) => {
  try {
    const userId = req.authUserId;
    const { id } = req.params;
console.log("running the querry---");
    if (!userId) {
      return next(new BadRequestError("Provider not logged in"));
    }

    if (!id) {
      return next(new BadRequestError("Listing id is required"));
    }
console.log("running the querry----");
    //  Ownership + existence check
    const house = await House.findOne({
      _id: id,
      owner: userId,
    });

    if (!house) {
      return next(
        new NotFoundError("Listing not found or you are not authorized")
      );
    }
console.log("running the querry-----");
    //  Hard delete
    await house.deleteOne();
console.log("running the querry-----");
    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};


export const getSingleListing = async (req, res, next) => {
  try {
    const userId = req.authUserId;
    const { id } = req.params;

    if (!userId) {
      return next(new BadRequestError("Provider not logged in"));
    }

    if (!id) {
      return next(new BadRequestError("Listing id is required"));
    }

    // 🔐 Ownership check + fetch
    const house = await House.findOne({
      _id: id,
      owner: userId,
    });

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



export const updateListing = async (req, res, next) => {
  try {
    const userId = req.authUserId;
    const { id } = req.params;

    if (!userId) {
      return next(new BadRequestError("Provider not logged in"));
    }

    if (!id) {
      return next(new BadRequestError("Listing id is required"));
    }

    // 🔐 Ownership check
    const house = await House.findOne({
      _id: id,
      owner: userId,
    });

    if (!house) {
      return next(
        new NotFoundError("Listing not found or not authorized")
      );
    }

    // 🔴 REQUIRED coordinates
    // const latRaw = req.body["coordinates[lat]"];
    // const longRaw = req.body["coordinates[long]"];
 console.log("req.body---",req.body);
    const latRaw = req.body.coordinates.lat;
    const longRaw = req.body.coordinates.long;
       console.log("lat--",latRaw);
        console.log("lon--",longRaw);    

    if (!latRaw || !longRaw) {
      return next(
        new BadRequestError("Latitude and Longitude are required")
      );
    }

    const lat = Number(latRaw);
    const long = Number(longRaw);

    if (Number.isNaN(lat) || Number.isNaN(long)) {
      return next(
        new BadRequestError("Latitude and Longitude must be valid numbers")
      );
    }

    // Handle images (optional)
    const images = {
      bedroom:
        req.files?.bedroomImages?.map((f) => f.path) ??
        house.images.bedroom,
      bathroom:
        req.files?.bathroomImages?.map((f) => f.path) ??
        house.images.bathroom,
      kitchen:
        req.files?.kitchenImages?.map((f) => f.path) ??
        house.images.kitchen,
      exterior:
        req.files?.exteriorImages?.map((f) => f.path) ??
        house.images.exterior,
      other:
        req.files?.otherImages?.map((f) => f.path) ??
        house.images.other,
    };

    //  Update fields
    house.name = req.body.name ?? house.name;
    house.description = req.body.description ?? house.description;
    house.category = req.body.category ?? house.category;
    house.pricePerNight = req.body.pricePerNight
      ? Number(req.body.pricePerNight)
      : house.pricePerNight;
    house.location = req.body.location ?? house.location;
    house.amenities = req.body.amenities ?? house.amenities;
    house.houseRules = req.body.houseRules ?? house.houseRules;
    house.maxGuests = req.body.maxGuests ?? house.maxGuests;
    house.bedrooms = req.body.bedrooms ?? house.bedrooms;
    house.baths = req.body.baths ?? house.baths;

    house.coordinates = { lat, long };
    house.images = images;

    await house.save();

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: house,
    });
  } catch (err) {
    next(err);
  }
};
