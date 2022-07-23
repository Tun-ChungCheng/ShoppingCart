const Cart = require("../models").cart;

exports.cart = async () => {
  const cart = await Cart.find().populate({
    path: "items.productId",
    select: "quantity price total",
  });
  return cart[0];
};

exports.addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};

exports.deleteAll = async () => {
  const cart = await Cart.deleteMany();
  return cart;
};
