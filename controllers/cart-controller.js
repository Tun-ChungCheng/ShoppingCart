const cartRepository = require("../repositories").cartRepository;
const productRepository = require("../repositories").productRepository;

exports.addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const { quantity } = Number.parseInt(req.body.quantity);
  try {
    let productDetails = await productRepository.productById(productId);
    let cart = await cartRepository.cart();
    if (!productDetails) {
      res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    /***** Cart exists *****/
    if (cart) {
      const indexFound = cart.items.findIndex(
        (item) => (item.productId.id = productId)
      );
      /***** Product exists but quantity <= 0 *****/
      if (indexFound != -1 && quantity <= 0) {
        cart.items.splice(index, 1);
        if (cart.items.length == 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
        /***** Product exists and quantity > 0 *****/
      } else if (indexFound != -1) {
        cart.items[indexFound].quantity =
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.item[indexFound].total + quantity * productId.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
        /***** Product doesn't exist but quantity > 0 *****/
      } else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: price,
          total: parseInt(quantity * productDetails.price),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
        /***** Product doesn't exist and quantity < 0 *****/
      } else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      let data = await cart.save();
      res.status(200).json({
        type: "success",
        msg: "Process Successful",
        data: data,
      });
    } else {
      const cartData = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            price: productDetails.price,
            total: parseInt(productDetails.quantity * productDetails.price),
          },
        ],
        subTotal: parseInt(productDetails.quantity * productDetails.price),
      };
      let cart = await cartRepository.addItem(cartData);
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

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
