require("dotenv").config({ path: "../.env" });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const hashString = (str) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};
const compareHashedString = (data, hashedString) => {
  return bcrypt.compareSync(data, hashedString);
};

const generateToken = (payload) => {
  return jwt.sign({ data: payload }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

const compareToken = (payload) => {
  return jwt.verify(payload, process.env.SECRET_KEY);
};

const uploadFilePath = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const fileAddress = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    "images",
    String(year),
    String(month + 1),
    String(day)
  );
  require("fs").mkdirSync(fileAddress, { recursive: true });
  return path.join(
    "public",
    "uploads",
    "images",
    String(year),
    String(month + 1),
    String(day)
  );
};

module.exports = {
  hashString,
  compareHashedString,
  generateToken,
  compareToken,
  uploadFilePath,
};
