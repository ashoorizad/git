const {
  signup,
  login,
  changeProfile,
  getUsers,
  getUser,
  changePassword,
  deleteAccount,
  getProfile,
  saveImage,
  logOut,
  getOtp,
  checkOtp
} = require("../controller/userController");
const { upload } = require("../modules/multer");
const { checkLogin } = require("../validation/checkLogin");
const { imageValidation } = require("../validation/fileValidation");
const router = require("express").Router();
router.post("/signup", signup);
router.post("/login", login);
router.put("/logout",checkLogin, logOut);
router.post("/change-profile", checkLogin, changeProfile);
router.post("/change-password", checkLogin, changePassword);
router.delete("/delete-account", checkLogin, deleteAccount);
router.get("/getprofile", checkLogin, getProfile);
router.post(
  "/upload-avatar",
  checkLogin,
  upload.single("avatar"),
  imageValidation,
  saveImage
);
router.get("/get-otp",getOtp)
router.post("/check-otp",checkOtp)
router.get("/:id", getUser);
router.get("/", getUsers);
module.exports = router;
