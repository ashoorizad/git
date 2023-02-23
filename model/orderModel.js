const { Schema, model, Types } = require("mongoose");
const orderSchema = new Schema(
  {
    orderItems: [
      {
        product: {
         name: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, require: true },
    brand: { type: String, require: true },
    color: { type: [String], require: true },
    rating: { type: Number, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    image: { type: String },
        },
        qty: { type: Number, require: true },
      },
    ],
    shippingAddress: {
      name: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalCode: { type: String, require: true },
      phoneNumber: { type: String, require: true },
    },
    paymentMethod: { type: String, require: true },
    shippingPrice: { type: Number, require: true,default:5 },
    totalPrice: { type: Number, require: true },
    user: { type: String, require: true },
  },
  { timestamps: true }
);
const orderModel = model("order", orderSchema);
module.exports = orderModel;
