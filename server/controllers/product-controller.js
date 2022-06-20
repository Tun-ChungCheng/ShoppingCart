const productRepository = require("../repositories").productRepository;
const productValidation = require("../config/validation").productValidation;
const Product = require("../models").productModel;

exports.createProduct = async (req, res) => {
  const { error } = productValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (req.user.isCustomer())
    return res.status(400).send("Only Seller can post new product.");
  try {
    console.log(req);
    let payload = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
      //seller: req.user._id,
    };
    let product = await productRepository.createProduct({
      ...payload,
    });
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let products = await productRepository.products();
    res.status(200).json({
      status: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await productRepository.productById(id);
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: true,
      error: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = productValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let { id } = req.params;
    let product = await productRepository.productById(id);
    if (product.seller.equals(req.user._id) || req.user.isAdmin()) {
      let renewProduct = await productRepository.renewProduct(id, req.body);
      res.status(200).json({
        status: true,
        data: renewProduct,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: true,
      error: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await productRepository.removeProduct(id);
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: true,
      error: err,
    });
  }
};
