const yup = require("yup");
var randomstring = require("randomstring");
const { signupSchema } = require("../validation/signupSchema");
const userModel = require("../model/userModel");
const { loginSchema } = require("../validation/loginSchema");
const { isValidObjectId } = require("mongoose");
const {
  hashString,
  compareHashedString,
  generateToken,
} = require("../modules/utils");
const signup = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, phoneNumber } =
      req.body;
    await signupSchema.validate(
      { username, email, password, confirmPassword, phoneNumber },
      { abortEarly: false }
    );
    if (password != confirmPassword)
      throw { message: "passwords in not equal" };

    if (await userModel.findOne({ username }))
      throw { message: "username exist" };
    if (await userModel.findOne({ email })) throw { message: "email exist" };
    if (await userModel.findOne({ phoneNumber }))
      throw { message: "phoneNumber exist" };

    // if(await userModel.findOne({ $or:[{username},{email},{phoneNumber}] }))
    // throw {message:"user exist"}

    await userModel.create({
      username,
      email,
      password: hashString(password),
      confirmPassword,
      phoneNumber,
    });

    res
      .status(201)
      .json({ status: 201, success: true, message: "user created" });
  } catch (error) {
    next({
      status: 400,
      message: error.errors || error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { profile, password } = req.body;
    await loginSchema.validate({ profile, password });
    const user = await userModel.findOne(
      {
        $or: [
          { email: profile },
          { username: profile },
          { phoneNumber: profile },
        ],
      },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (!user) throw { message: "email or password is wrong" };
    if (!compareHashedString(password, user.password))
      throw { message: "email or password is wrong" };
    user.token = generateToken(user.username);
    user.save();
    const userSend = JSON.parse(JSON.stringify(user));
    delete userSend.password;
    res.json(userSend);
  } catch (error) {
    next({ status: 400, message: error.errors || error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findOne(
      { username: req.username },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (!user) throw { message: "user not found" };
    if (!compareHashedString(oldPassword, user.password))
      throw { message: "old password is wrong" };
    await yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      )
      .required()
      .validate(newPassword);
    res.status(200).json({
      status: 200,
      success: true,
      message: "user password changed successfully",
    });
  } catch (error) {
    next({ status: 400, message: error.errors || error.message });
  }
};

const changeProfile = async (req, res, next) => {
  try {
    const { age, address, name, family } = req.body;
    const result = await userModel.updateOne(
      { username: req.username },
      { age, address, name, family }
    );
    if (!result.modifiedCount) throw { message: "user profile wasn't change" };
    res.status(200).json({
      status: 200,
      success: true,
      message: "user profile changed successfully",
    });
  } catch (error) {
    next({ status: 400, message: error.errors || error.message });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    next({ message: error.message });
  }
};
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw { message: "id is wrong" };
    const user = await userModel.findOne({ _id: id });
    if (!user) throw { message: "user not found" };
    res.status(200).json(user);
  } catch (error) {
    next({ message: error.message });
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const result = await userModel.deleteOne({ username: req.username });
    res.status(200).json(result);
  } catch (error) {
    next({ message: error.message });
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await userModel.findOne(
      { username: req.username },
      { password: 0, updatedAt: 0, createdAt: 0, __v: 0 }
    );
    if (!user) throw { message: "user not found" };
    res.status(200).json(user);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

const saveImage = async (req, res, next) => {
  try {
    const image = req.file;
    // console.log(image.path.slice(6).replace(/[\\\\]/gmi,"/"))
    const imagePath =
      req.protocol +
      "://" +
      req.get("host") +
      image.path.slice(6).replaceAll("\\", "/");
    const result = await userModel.updateOne(
      { username: req.username },
      { avatar: imagePath }
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: "image uploaded successfully",
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

const logOut = async (req, res, next) => {
  try {
    await userModel.updateOne({ username: req.username }, { token: "" });
    res
      .status(200)
      .json({ status: 200, success: true, message: "user logged out" });
  } catch (error) {
    next();
  }
};

const getOtp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    await yup
      .string()
      .length(11)
      .matches(/09[\d]/, "phone number is not valid")
      .required()
      .validate(phoneNumber);
    if (!(await userModel.findOne({ phoneNumber })))
      throw { message: "user not found" };
    // const OTP = Math.floor(Math.random() * 8999 + 1000);
    const value = randomstring.generate(7);
    const result = await userModel.updateOne(
      { phoneNumber },
      { OTP: { value, expireIn: Date.now() + 150000 } }
    );
    res
      .status(200)
      .json({ status: 200, success: true, message: "enter your OTP code" });
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

const checkOtp = async (req, res, next) => {
  try {
    const { phoneNumber, OTP } = req.body;
    await yup
      .string()
      .length(11)
      .matches(/09[\d]/, "phone number is not valid")
      .required()
      .validate(phoneNumber);
    const user = await userModel.findOne(
      { phoneNumber },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (!user) throw { message: "user not found" };
    if (Date.now() > user.OTP.expireIn) throw { message: "OTP code expired" };
    if( OTP !== user.OTP.value) throw { message: "OTP code is wrong" }
    user.token = generateToken(user.username);
    user.save();
    const userSend = JSON.parse(JSON.stringify(user));
    delete userSend.password;
    delete userSend.OTP;
    res.json(userSend);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

module.exports = {
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
  checkOtp,
};

// const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// const phoneNumberRegex = /09[\d]/;
// if (!emailRegex.test(email)) throw { message: "email is not valid" };
// if (!passwordRegex.test(password))
//   throw { message: "password is not valid" };
// if (password != confirmPassword)
//   throw { message: "passwords is not equal" };
// if (username.length < 5) throw { message: "username is too short" };
// if (!phoneNumberRegex.test(phoneNumber))
//   throw { message: "phone number is not valid" };
// if (phoneNumber.length != 11)
//   throw { message: "phone number is not equal 11" };
