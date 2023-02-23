const path = require("path");
const multer = require("multer");
const { uploadFilePath } = require("./utils");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFilePath());
  },
  filename: function (req, file, cb) {
    const type = path.extname(file.originalname);
    cb(null, Date.now() + type);
  },
});
const upload = multer({ storage: storage });
module.exports = { upload };
