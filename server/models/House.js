import mongoose from "mongoose";
const HouseSchema = new mongoose.Schema({
  name: { type: String, required: true },        // "Luxury Villa in Goa"
  images: {
  bedroom: [{ type: String }],
  bathroom: [{ type: String }],
  kitchen: [{ type: String }],
  exterior: [{ type: String }],
  other: [{ type: String }],
},                 // ["villa1.jpg", "villa2.jpg"]
  description: { type: String },                 // "Beautiful 3BHK villa near beach"
  category: { type: String },                    // "Villa" / "Apartment"
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  pricePerNight: { type: Number, required: true },  // 2500
  location: { type: String, required: true },    // "Goa, India"
  coordinates: {
    lat: { type: Number },                       // 15.2993
    long: { type: Number }                       // 74.1240
  },
  amenities: [{ type: String }],                 // ["WiFi", "AC", "Parking"]
  houseRules: { type: String },                  // "No smoking inside"
  maxGuests: { type: Number },                   // 6
  bedrooms: { type: Number },                    // 3
  baths: { type: Number },                       // 2
  availability: [{
    checkIn: { type: Date },                     // 2025-08-27
    checkOut: { type: Date }                     // 2025-08-30
  }],
  isActive: {
    type: Boolean,
    default: true   // ✅ listing active by default
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now }
});
const House = mongoose.model("House", HouseSchema);
export default House;

