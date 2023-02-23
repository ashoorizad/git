const permissionModel = require("../model/permissionModel");
const roleModel = require("../model/roleModel");
const userModel = require("../model/userModel");
const addrole = async (req, res, next) => {
  try {
    await roleModel.create(req.body);
    res
      .status(201)
      .json({ message: "role created", success: true, status: 200 });
  } catch (error) {
    next(error);
  }
};
const removerole = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await roleModel.remove({ _id });
    res
      .status(200)
      .json({ message: "role deleted", success: true, status: 200 });
  } catch (error) {
    next(error);
  }
};
const getrole = async (req, res, next) => {
  try {
    const roles = await roleModel.find({});
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

const setrole = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { Role } = req.body;
    await userModel.updateOne({ _id }, { Role });
    res.status(200).json({ message: "role has been set" });
  } catch (error) {
    next(error);
  }
};

module.exports = { addrole, removerole, getrole, setrole };
