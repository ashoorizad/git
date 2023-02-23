const {
  addPermission,
  removePermission,
  getPermission
} = require("../controller/permissionController");

const router = require("express").Router();

router.get("/", getPermission);
router.post("/add", addPermission);
router.delete("/remove", removePermission);

module.exports = router;
