import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        id: String,
        qty: Number
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Sale", SaleSchema);
