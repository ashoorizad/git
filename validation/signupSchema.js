const yup = require("yup");

const signupSchema = yup.object().shape({
  username: yup.string().min(5).required(),
  email: yup
    .string()
    .email()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
  confirmPassword: yup.string().required(),
  phoneNumber: yup
    .string()
    .length(11)
    .matches(/09[\d]/)
    .required(),
});

module.exports = { signupSchema };
