const { addrole, getrole, setrole } = require("../controller/roleController");
const { checkLogin } = require("../validation/checkLogin");
const { checkPermisson } = require("../validation/checkPermission");

const router = require("express").Router();

router.get("/", getrole);
router.post("/add", addrole);
router.post("/set/:_id", checkLogin, checkPermisson("owner"), setrole);
router.delete("/remove");

module.exports = router;
