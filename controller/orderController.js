const { isValidObjectId } = require("mongoose");
const orderModel = require("../model/orderModel");

const submitOrder = async (req, res, next) => {
  try {
    await orderModel.create(req.order);
    res.status(201).json({
      status: 201,
      success: true,
      message: "your order submitted successfully",
    });
  } catch (error) {
    next({
      status: 500,
      message: error.message,
    });
  }
};

const getOneOrder = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id ))
    throw { message: "orderId is not valid" };
    const result = await orderModel.find(
      { _id },
      { user: 0, __v: 0, updatedAt: 0 }
    );
    if (!result) throw { message: "order not found" };

    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: error.errors || error.message,
    });
  }
};

const getOrders = async (req, res, next) => {
  try {
    const result = await orderModel.find(
      { user: req.username },
      { user: 0, __v: 0, updatedAt: 0, shippingAddress: 0 }
    );
    if (!result.length) throw { message: "no order submitted" };
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: error.errors || error.message,
    });
  }
};

module.exports = { submitOrder, getOneOrder, getOrders };
