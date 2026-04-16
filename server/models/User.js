import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
 firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [25, 'First Name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [25, 'Last Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  mobile: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
role: {
    type: String,
    enum: ['user', 'provider', 'admin'],
    default: 'user'
  },
profileImage: {
    type: String,
    default: ''
  },
wishlist: [{ 
  type: mongoose.Schema.Types.ObjectId, 
  ref: "House" 
}], 
  bookings: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Booking" 
  }],
  verifyOtp:{
    type:String, 
    default:''
  },
  verifyOtpExpireAt:{
    type:Number, 
    default:0
  },
  resetOtp:{
    type:String, 
    default:''
  },
  resetOtpExpireAt:{
    type:Number, 
    default:0
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  isHostVerified: { 
    type: Boolean, 
    default: false 
  },
  isBlocked: {
  type: Boolean,
  default: false
},
  kycDocs: [{
    docType: { type: String },     // "Aadhar", "PAN"
    docUrl: { type: String },      // "https://s3.aws.com/pan.jpg"
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], default: "pending" 
            }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now
   }
});
const User = mongoose.model("User", UserSchema);
export default User;
