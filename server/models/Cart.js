import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  houses: [{ type: mongoose.Schema.Types.ObjectId, ref: "House" }],
  total: { type: Number }                        // 7500
});
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
