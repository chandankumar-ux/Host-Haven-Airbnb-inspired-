import Booking from "../models/Booking.js"
import House from "../models/House.js"
import User from "../models/User.js"
import { BadRequestError, MissingDetailsError } from "../errors/AppError.js"

export const dashboardController=async(req,res,next)=>{
    try{
    if(!req.authUserId){
        return next (new MissingDetailsError("Please Login first"));
    }
    const user = await User.findById(req.authUserId);
    if(!user){
        return next (new MissingDetailsError("User doesn't exist"));
    }
    if(user.role!=="admin"){
        return next (new BadRequestError("You'r not an admin") );
    }
    const totalBookings = await Booking.countDocuments({});
    // console.log("totalBookings",totalBookings);
    const totalUsers = await User.countDocuments({});
    // console.log("totalUsers",totalUsers);
    const totalHouses = await House.countDocuments({});
    // console.log("totalHouses",totalHouses);
    const totalProviders= await User.countDocuments({role:"provider",isHostVerified:true});
    // console.log("totalProviders",totalProviders);
    const totalpendingProviders = await User.countDocuments({role:"provider",isHostVerified:false});
    // console.log("totalpendingProviders",totalpendingProviders);
     return res.status(201).json({
      success: true,
      message: "Data send successfully to the admin dashboard",
      stats: {
        users: totalUsers,
        providers: totalProviders,
        pendingProviders: totalpendingProviders,
        listings: totalHouses,
        bookings: totalBookings,
      }
    }); 
  }catch(err){
    next(err);
  }

}

export const providerRequests=async(req,res,next)=>{
  try{
    if(!req.authUserId){
        return next (new MissingDetailsError("Please Login first"));
    }
    const user = await User.findById(req.authUserId);
    if(!user){
        return next (new MissingDetailsError("User doesn't exist"));
    }
    if(user.role!=="admin"){
        return next (new BadRequestError("You'r not an admin") );
    }
    const totalData=await User.find({role:"provider",isHostVerified:false});
    // console.log("total data--",totalData);
     return res.status(201).json({
      success: true,
      message: "Data send successfully to the admin dashboard",
      data:totalData,
    }); 
    
  }catch(err){
    next(err);
  }
}

export const adminApproval = async (req, res, next) => {
  try {
    const { userId, action } = req.body;

    if (!userId || !action) {
      return next(new MissingDetailsError("UserId and action required"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new MissingDetailsError("User doesn't exist"));
    }

    if (action === "approve") {
      user.isHostVerified = true;   
      await user.save();            

      return res.status(200).json({
        success: true,
        message: "User approved as provider",
      });
    }

    if (action === "reject") {
      user.role = user;   
      await user.save();    
      return res.status(200).json({
        success: true,
        message: "User rejected for provider role",
      });
    }

  } catch (err) {
    next(err);
  }
};

export const users=async(req,res,next)=>{
  try{
    if(!req.authUserId){
        return next (new MissingDetailsError("Please Login first"));
    }
    const user = await User.findById(req.authUserId);
    if(!user){
        return next (new MissingDetailsError("User doesn't exist"));
    }
    if(user.role!=="admin"){
        return next (new BadRequestError("You'r not an admin") );
    }
    const totalData=await User.find({role:"user"});
    // console.log("total data--",totalData);
     return res.status(201).json({
      success: true,
      message: "User List send successfully to the admin dashboard",
      data:totalData,
    }); 
  }
  catch(err){
    next(err);
  }
}
export const blockUnblockUser = async (req, res, next) => {
  try {
    const { userId, action } = req.body;

    if (!userId || !action) {
      return next(new MissingDetailsError("UserId and action required"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new MissingDetailsError("User not found"));
    }

    if (action === "block") {
      user.isBlocked = true;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User blocked successfully",
      });
    }

    if (action === "unblock") {
      user.isBlocked = false;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User unblocked successfully",
      });
    }

    return next(new BadRequestError("Invalid action"));

  } catch (err) {
    next(err);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
     if(!req.authUserId){
        return next (new MissingDetailsError("Please Login first"));
    }
    const user = await User.findById(req.authUserId);
    if(!user){
        return next (new MissingDetailsError("User doesn't exist"));
    }
    if(user.role!=="admin"){
        return next (new BadRequestError("You'r not an admin") );
    }
    const listings = await House.find()
      .populate("owner", "firstName lastName email");
// console.log("listings--",listings);
    return res.status(200).json({
      success: true,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

export const toggleListingStatus = async (req, res, next) => {
  try {
    if (!req.authUserId) {
      return next(new MissingDetailsError("Please login first"));
    }

    const admin = await User.findById(req.authUserId);
    if (!admin || admin.role !== "admin") {
      return next(new BadRequestError("Admin access only"));
    }

    const { id } = req.params;

    const listing = await House.findById(id);
    if (!listing) {
      return next(new BadRequestError("Listing not found"));
    }

    // 🔥 TOGGLE
    listing.isActive = !listing.isActive;
    await listing.save();

    return res.status(200).json({
      success: true,
      message: `Listing ${listing.isActive ? "enabled" : "disabled"} successfully`,
      data: {
        id: listing._id,
        isActive: listing.isActive,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const adminBookings = async (req, res, next) => {
  try {
    if (!req.authUserId) {
      return next(new MissingDetailsError("Please login first"));
    }

    const admin = await User.findById(req.authUserId);
    if (!admin || admin.role !== "admin") {
      return next(new BadRequestError("You're not an admin"));
    }

    const bookings = await Booking.find()
      .populate("user", "firstName lastName email")
      .populate("house", "name")
      .sort({ createdAt: -1 });

    //  Frontend-friendly response (IMPORTANT)
    const formattedBookings = bookings.map((b) => ({
      _id: b._id,
      user: {
        name: `${b.user?.firstName} ${b.user?.lastName}`,
      },
      listing: {
        title: b.house?.name,
      },
      totalAmount: b.total?.totalAmount,
      createdAt: b.createdAt,
    }));

    return res.status(200).json({
      success: true,
      data: formattedBookings,
    });
  } catch (err) {
    next(err);
  }
};