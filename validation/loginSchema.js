const yup = require("yup");

const loginSchema = yup.object().shape({
  profile: yup.string().min(5).required(),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
});

module.exports = { loginSchema };
