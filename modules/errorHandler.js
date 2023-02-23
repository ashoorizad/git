const httpErrors = require("http-errors")
const notFound = (req, res) => {
  res.status(404).json({ message: "not found :(" });
};

const errorRes = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || new httpErrors.InternalServerError();
  res.status(status).json({
    status,
    success: false,
    message,
  });
};

module.exports = {notFound,errorRes}