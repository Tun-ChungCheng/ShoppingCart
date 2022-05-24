const productRepository = require("./repository");
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
