const yup = require("yup");

const shippingAddressValidation = yup.object().shape({
  name: yup.string().min(3).required(),
  address: yup.string().min(10).required(),
  postalCode: yup.string().length(10).required(),
  city: yup.string().min(3).required(),
  phoneNumber: yup
    .string()
    .length(11)
    .matches(/09[\d]/)
    .required(),
});

module.exports = { shippingAddressValidation };
