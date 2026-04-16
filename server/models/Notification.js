import mongoose from "mongoose";
const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String },                        // "Booking Confirmation"
  message: { type: String },                     // "Your booking is confirmed"
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
