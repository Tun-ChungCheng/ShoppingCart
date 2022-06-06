const productRepository = require("../repositories").productRepository;

exports.createProduct = async (req, res) => {
  try {
    let payload = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
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
    console.log(id, product);
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

exports.removeProduct = async (req, res) => {
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
