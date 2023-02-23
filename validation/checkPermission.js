const roleModel = require("../model/roleModel");
const userModel = require("../model/userModel");

const checkPermisson = (requiredRole) => async (req, res, next) => {
  try {
    const { username } = req;
    const user = await userModel.findOne({ username });
    const { permission } = await roleModel.findOne({
      title: user.Role,
    });
    if (user.Role === "owner") return next();
    if (!permission.includes(requiredRole))
      throw { status: 403, message: "you don't have permission this route" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkPermisson };