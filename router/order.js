const { submitOrder, getOrders, getOneOrder } = require("../controller/orderController");
const { checkLogin } = require("../validation/checkLogin");
const { orderValidation } = require("../validation/orderValidation");
const router = require("express").Router();

router.post("/submit",checkLogin,orderValidation,submitOrder)
router.get("/:_id",checkLogin,getOneOrder)
router.get("/",checkLogin,getOrders)

module.exports =router