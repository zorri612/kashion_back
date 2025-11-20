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
    required: false,
  },
  image: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "general", //ropaHombre, ropaMujer, accesorios, calzadoHombre, calzadoMujer
  },
  tallas: [
  {
    talla: { type: String, required: true },
    stock: { type: Number, required: true }
  }
]

}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
