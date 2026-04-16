import User from "../models/User.js";
import { BadRequestError } from "../errors/AppError.js";
import Booking from "../models/Booking.js";
export const becomeHost = async (req, res, next) => {
  try {
    //  Logged-in user id (JWT middleware se aata hai)
    const userId = req.authUserId;

    //  Files from multer
    if (!req.files?.aadhar || !req.files?.pan || !req.files?.photo) {
      return next(new BadRequestError("All KYC documents are required"));
    }

    const aadharUrl = req.files.aadhar[0].path;
    const panUrl = req.files.pan[0].path;
    const photoUrl = req.files.photo[0].path;
    const profileImageUrl = req.files.profileImage
      ? req.files.profileImage[0].path
      : "";

    //  Find user
    const user = await User.findById(userId);
    // console.log("UserID in Host COntroller---",userId);
        // console.log("User in Host COntroller---",user);

    
    if (!user) {
      return next(new BadRequestError("User not found"));
    }

    //  KYC Docs push
    user.kycDocs = [
      {
        docType: "Aadhar",
        docUrl: aadharUrl,
        status: "pending",
      },
      {
        docType: "PAN",
        docUrl: panUrl,
        status: "pending",
      },
      {
        docType: "Photo",
        docUrl: photoUrl,
        status: "pending",
      },
    ];

    //  Host related updates
    user.profileImage = profileImageUrl;
    user.role = "provider";
    user.isHostVerified = false;
    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Host request submitted successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isVerified: user.isVerified,
        id: user._id,
        isHostVerified: user.isHostVerified,
        kycDocs: user.kycDocs,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const myBookings=async(req,res,next)=>{
  try {
    const userId = req.authUserId;

    if (!userId) {
      return next(new BadRequestError("User not authenticated"));
    }

    const bookings = await Booking.find({ user: userId })
      .populate("house", "name location images pricePerNight")
      .sort({ createdAt: -1 }); // latest booking first

    return res.status(200).json(bookings);
  }catch(err){
    next(err);
  }

}
