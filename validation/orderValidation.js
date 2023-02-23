const { isValidObjectId } = require("mongoose");
const productModel = require("../model/produtModel");
const { shippingAddressValidation } = require("./submitOrderSchema");

const orderValidation = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = JSON.parse(
      JSON.stringify(req.body)
    );
    await shippingAddressValidation.validate(shippingAddress, {
      abortEarly: false,
    });
    if (!["cash", "online"].includes(paymentMethod))
      throw { message: "paymentMethod is not valid" };
    let totalPrice = 0;
    for (const item of orderItems) {
      if (!isValidObjectId(item.product))
        throw { message: "productId is not valid" };
      const prod = await productModel.findOne(
        { _id: item.product },
        { __v: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!prod) throw { message: "The product not found" };
      item.product = prod;
      if (item.qty > prod.countInStock)
        throw { message: "موجودی محصول کافی نیست" };
      totalPrice += item.qty * prod.price;
    }
    totalPrice += 5;
    const orderSubmitData = {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      user: req.username,
    };
    req.order = orderSubmitData;
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.errors || error.message,
    });
  }
};

module.exports = { orderValidation };
