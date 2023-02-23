const yup = require("yup");

const addProdSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string().min(10).required(),
  category: yup.string().min(3).required(),
  brand: yup.string().min(2).required(),
  color: yup.array().of(yup.string().min(3).required()).required(),
  rating: yup.number().min(1).max(5).required(),
  price: yup.number().min(0).required(),
  countInStock: yup.number().min(0).required(),
});

module.exports = { addProdSchema };
