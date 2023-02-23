const { Schema, model, Types } = require("mongoose");
const roleSchema = new Schema(
  {
    title: { type: String, default: "" },
    permission: { type: [String], require: true, default: [] },
  },
  { timestamps: true }
);
const roleModel = model("role", roleSchema);
module.exports = roleModel;
