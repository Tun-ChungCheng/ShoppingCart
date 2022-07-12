const Cart = require("../models").cartModel;

exports.cart = async () => {
  const carts = await Cart.find().populate({
    path: "items.productId",
    select: "quantity price total",
  });
  return carts[0];
};

exports.addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};
