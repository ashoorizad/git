const path = require("path");
require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/router");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nodejs-course", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to DB");
  }
});
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);
app.listen("3000", () => console.log("server run on port 3000"));
console.log("second")