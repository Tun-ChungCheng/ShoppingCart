const cartRepository = require("../repositories").cartRepository;
const productRepository = require("../repositories").productRepository;

exports.addItemToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let quantity = Number.parseInt(req.body.quantity, 10);
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
        (item) => item.productId._id == productId
      );

      /***** Product exists but item's quantity <= 0 *****/
      if (indexFound != -1 && cart.items[indexFound].quantity <= 0) {
        cart.items.splice(indexFound, 1);
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
          cart.items[indexFound].total + quantity * productDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);

        /***** Product doesn't exist but quantity > 0 *****/
      } else if (quantity > 0) {
        console.log(cart);
        cart.items.push({
          productId: productId,
          quantity: quantity,
          name: productDetails.name,
          price: productDetails.price,
          image: productDetails.image,
          total: parseInt(quantity * productDetails.price),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next, 0);

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
            name: productDetails.name,
            price: productDetails.price,
            image: productDetails.image,
            total: parseInt(quantity * productDetails.price),
          },
        ],
        subTotal: parseInt(quantity * productDetails.price),
      };
      let cart = await cartRepository.addItem(cartData);
      res.json(cart);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      error: error,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    let cart = await cartRepository.cart();

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
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      error: error,
    });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    let productId = req.params._id;
    let cart = await cartRepository.cart();
    const indexFound = cart.items.findIndex((item) => item._id == productId);
    cart.items.splice(indexFound, 1);
    /***** Product exist *****/
    if (indexFound != -1) {
      cart.subTotal = cart.items
        .map((item) => item.total)
        .reduce((acc, next) => acc + next, 0); // The second parameter is for initial value.
      let data = await cart.save();
      res.status(200).json({
        data: data,
      });
      /***** Product doesn't exist *****/
    } else {
      res.status(400).json({
        type: "Invalid",
        msg: "Cart Not Found.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      error: error,
    });
  }
};
