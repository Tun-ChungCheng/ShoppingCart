const Product = require("../models").productModel;

exports.createProduct = async (payload) => {
  const product = await Product.create(payload);
  return product;
};

exports.products = async () => {
  const products = await Product.find();
  return products;
};

exports.productById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.updateProduct = async (id, payload) => {
  const product = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return product;
};

exports.removeProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
