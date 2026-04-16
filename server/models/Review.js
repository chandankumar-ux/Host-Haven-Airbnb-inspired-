import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  house: { type: mongoose.Schema.Types.ObjectId, ref: "House" },
  userName: { type: String },                    // "Rahul Sharma"
  comment: { type: String },                     // "Very clean and spacious!"
  rating: { type: Number, min: 1, max: 5 },      // 4
  createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
