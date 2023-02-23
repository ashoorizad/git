const permissionModel = require("../model/permissionModel");
const addPermission = async (req, res, next) => {
  try {
    await permissionModel.create(req.body);
    res
      .status(201)
      .json({ message: "permission created", success: true, status: 200 });
  } catch (error) {
    next(error);
  }
};
const removePermission = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await permissionModel.remove({ _id });
    res
      .status(200)
      .json({ message: "permission deleted", success: true, status: 200 });
  } catch (error) {
    next(error);
  }
};

const getPermission = async (req, res, next) => {
  try {
    const permissions = await permissionModel.find({});
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};
module.exports = { addPermission, removePermission, getPermission };
