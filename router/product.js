const {
  addProd,
  getProducts,
  getOneProduct,
  editProd,
  serachProd,
  deleteProd,
  saveImage,
  checkIdProduct,
} = require("../controller/prodController");
const { upload } = require("../modules/multer");
const { checkLogin } = require("../validation/checkLogin");
const { checkPermisson } = require("../validation/checkPermission");
const { imagesValidation } = require("../validation/fileValidation");
const router = require("express").Router();
router.post("/add-prod", addProd);
router.post(
  "/upload-productImage/:_id",
  checkIdProduct,
  upload.array("prod-image", 10),
  imagesValidation,
  saveImage
);
router.put("/edit-prod/:id", editProd);
router.get("/search", serachProd);
router.delete("/delete/:_id", checkLogin, checkPermisson("deleteProd"), deleteProd);
router.get("/:id", getOneProduct);
router.get("/", getProducts);
module.exports = router;
