const Product = require("../models").productModel;

exports.createProduct = async (payload) => {
  const newProduct = await Product.create(payload);
  return newProduct;
};

exports.products = async () => {
  const products = await Product.find();
  return products;
};

exports.productById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.removeProduct = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  return deletedProduct;
};
