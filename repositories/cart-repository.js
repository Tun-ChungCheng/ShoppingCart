const Cart = require("../models").cartModel;

exports.cart = async () => {
  const carts = await Cart.find().populate({
    path: "items.Product",
    select: "quantity price total",
  });
  console.log(carts);
  return carts[0];
};

exports.addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};
