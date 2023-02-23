const { isValidObjectId } = require("mongoose");
const productModel = require("../model/produtModel");
const { addProdSchema } = require("../validation/addProdSchema");

const addProd = async (req, res, next) => {
  try {
    await addProdSchema.validate(req.body, { abortEarly: false });
    await productModel.create(req.body);
    res
      .status(201)
      .json({ status: 201, success: true, message: "product created" });
  } catch (error) {
    next({
      status: 400,
      message: error.errors || error.message,
    });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const prodcuts = await productModel.find({});
    if (!prodcuts.length)
      throw { success: false, message: "محصولات وجود ندارند" };
    res.status(200).json(prodcuts);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const prodcut = await productModel.findOne({ _id });
    if (!prodcut) throw { success: false, message: "product not found" };

    res.status(200).json(prodcut);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

const editProd = async (req, res, next) => {
  try {
    const _id = req.params.id;
    for (const key in req.body) {
      if (
        ![
          "name",
          "description",
          "category",
          "brand",
          "color",
          "rating",
          "price",
          "countInStock",
        ].includes(key)
      ) {
        throw { success: false, message: "edit failed" };
      }
    }
    await productModel.updateOne({ _id }, req.body);
    res.status(200).json({ success: true, message: "product updated" });
  } catch (error) {
    next({
      status: 400,
      message: error.messages || error.message,
    });
  }
};
const serachProd = async (req, res, next) => {
  try {
    const query = req.query;
    const result = await productModel.find(query);
    res.json(result);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

const deleteProd = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await productModel.deleteOne({ _id });
    res.json(result);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};
const checkIdProduct = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) throw { message: "id is wrong" };
    if (!(await productModel.findOne({ _id })))
      throw { message: "The product not found" };
    next();
  } catch (error) {
    next({ message: error.message });
  }
};

const saveImage = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const images = req.files.map(
      (item) =>
        req.protocol +
        "://" +
        req.get("host") +
        item.path.slice(6).replaceAll("\\", "/")
    );
    await productModel.updateOne({ _id }, { $push: { images } });
    res.status(200).json({ success: true, message: "product images uploaded" });
  } catch (error) {
    next({ message: error.message });
  }
};

module.exports = {
  addProd,
  getProducts,
  getOneProduct,
  serachProd,
  editProd,
  deleteProd,
  saveImage,
  checkIdProduct,
};
