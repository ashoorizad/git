const { Schema, model } = require("mongoose");
const permissionSchema = new Schema(
  {
    name: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);
const permissionModel = model("permission", permissionSchema);
module.exports = permissionModel;
// add-prod
// delete-prod
// edit-prod
// upload-pic-prod

// get-all-user
// get-one-user
// delete-user

// ALL