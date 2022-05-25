const cartRepository = require("../repositories").cartRepository;

exports.addItemToCart = async (req, res) => {};

exports.getCart = async (req, res) => {
  try {
    console.log("0.0");
    let cart = await cartRepository.cart();
    console.log(cart);

    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart Not Found",
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      error: err,
    });
  }
};
