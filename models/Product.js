import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "general",
  },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
