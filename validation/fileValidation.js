const imageValidation = (req, res, next) => {
  try {
    const image = req.file;
    if (!image) throw { status: 400, message: "please select image" };
    const type = image.mimetype.split("/")[1];
    const size = image.size;
    if (size > 500 * 1024) {
      require("fs").unlinkSync(req.file.path);
      throw { status: 400, message: "size of the file must be lower than 2MB" };
    }
    if (!["jpg", "png", "jpeg", "gif"].includes(type)) {
      require("fs").unlinkSync(req.file.path);
      throw { status: 400, message: "format isn't valid" };
    }
    next();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};
const imagesValidation = (req, res, next) => {
  try {
    const images = req.files;
    if (!images) throw { status: 400, message: "please select image" };
    const error = [];
    for (item of images) {
      const type = item.mimetype.split("/")[1];
      const size = item.size;
      const help = { file: item.originalname, errors: [] };
      if (size > 500 * 1024) {
        help.errors.push("size of file must be lower than 2MB");
      }
      if (!["jpg", "png", "jpeg", "gif"].includes(type)) {
        help.errors.push("format of file isn't valid");
      }
      if (help.errors.length) {
        error.push(help);
      }
    }
    if (error.length) {
      for (item of images) {
        require("fs").unlinkSync(item.path);
      }
      throw error;
    }
    next();
  } catch (error) {
    next({ status: 400, message: error });
  }
};
module.exports = { imageValidation, imagesValidation };
