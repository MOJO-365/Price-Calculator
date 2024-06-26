// import mongoose from "mongoose";
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// export default mongoose.model("users", UserSchema);

const User = mongoose.model("users", UserSchema);
module.exports = User;