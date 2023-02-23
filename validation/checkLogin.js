const { compareToken } = require("../modules/utils");

const checkLogin = (req, res, next) => {
  try {
    const user = compareToken(req.headers.authorization.slice(7));
    req.username = user.data;
    next();
  } catch (error) {
   if(req.file){
    require("fs").unlinkSync(req.file.path);
   }
    next({
      status: 401,
      message: "please login",
    });
  }
};
module.exports = { checkLogin };
