const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String },
    age: { type: Number },
    family: { type: String },
    address: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    token: { type: String },
    Role: { type: String, require: true, default: "user" },
    avatar: {
      type: String,
      default: "http://localhost:3000/default/profileimage.png",
    },
    OTP: { value: { type: String }, expireIn: { type: Number } },
  },
  { timestamps: true }
);
const userModel = model("user", userSchema);
module.exports = userModel;
