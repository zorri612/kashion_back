import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
  },
  telegramId: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
