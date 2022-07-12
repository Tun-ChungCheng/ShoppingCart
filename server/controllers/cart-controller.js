const cartRepository = require("../repositories").cartRepository;
const productRepository = require("../repositories").productRepository;
const { default: mongoose } = require("mongoose");
// const redis = require("../config/cache");

exports.addItemToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const quantity = Number.parseInt(req.body.quantity, 10);
    const productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }

    let cart = await cartRepository.cart();
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
        cart.items.push({
          productId: productId,
          quantity: quantity,
          name: productDetails.name,
          price: productDetails.price,
          image: productDetails.image,
          seller: productDetails.seller,
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
      const data = await cart.save();
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
            seller: productDetails.seller,
            total: parseInt(quantity * productDetails.price, 10),
          },
        ],
        subTotal: parseInt(quantity * productDetails.price),
      };
      let data = await cartRepository.addItem(cartData);
      res.status(200).json({
        type: "success",
        msg: "Process Successful",
        data: data,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      error: err,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    // const cart = await redis.getOrSetCache(`cart`, async () => {
    let data = await cartRepository.cart();
    if (!data) {
      const cartData = {
        items: [],
        subTotal: 0,
      };
      data = await cartRepository.addItem(cartData);
    }
    //   return data;
    // });
    res.status(200).json({
      status: true,
      data: data,
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

exports.deleteItemFromCart = async (req, res) => {
  try {
    const productId = req.params._id;
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
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      error: err,
    });
  }
};
