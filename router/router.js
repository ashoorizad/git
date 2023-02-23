const { notFound, errorRes } = require("../modules/errorHandler");
const userRouter = require("./user");
const prodRouter = require("./product");
const orderRouter = require("./order");
const permissionRouter = require("./permission");
const roleRouter = require("./role");
const router = require("express").Router();
router.use("/user", userRouter);
router.use("/product", prodRouter);
router.use("/order", orderRouter);
router.use("/permission", permissionRouter);
router.use("/role", roleRouter);
router.get("/", (req, res) => {
  res.send("server is runing...");
});
router.use(notFound);
router.use(errorRes);
module.exports = router;

