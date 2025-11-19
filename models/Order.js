import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: Number,
      price: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "pendiente"
  }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
