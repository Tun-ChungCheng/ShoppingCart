const cartRepository = require("../repositories").cart;
const { createSignature, createLinePayBody } = require("../config/linepay");
const { LINEPAY_SITE, LINEPAY_VERSION } = process.env;
const axios = require("axios");

exports.createOrder = async (req, res) => {
  try {
    const cart = await cartRepository.cart();
    const packages = [];

    cart.items.map((item) => {
      packages.push({
        id: item.productId.id,
        amount: item.total,
        products: [
          {
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          },
        ],
      });
    });

    const order = {
      orderId: cart.updatedAt,
      amount: cart.subTotal,
      packages: packages,
    };

    // Build LINE Pay request format
    const linePayBody = createLinePayBody(order);

    // CreateSignature build encrypt content
    const uri = "/payments/request";
    const headers = createSignature(uri, linePayBody);

    // API address
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });

    // Request success...
    if (linePayRes?.data?.returnCode === "0000") {
      res.redirect(linePayRes?.data?.info.paymentUrl.web);
    } else {
      res.status(400).send({
        message: "訂單不存在",
      });
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
};

exports.confirmOrder = async (req, res) => {
  try {
    const { transactionId } = req.query;
    const cart = await cartRepository.cart();

    // Build LINE Pay request format
    const uri = `/payments/${transactionId}/confirm`;
    const linePayBody = {
      amount: cart.subTotal,
      currency: "TWD",
    };

    // CreateSignature build encrypt content
    const headers = createSignature(uri, linePayBody);

    // API address
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });
    console.log(linePayRes);

    // Request success...
    if (linePayRes?.data?.returnCode === "0000") {
      const cart = cartRepository.deleteAll();
      console.log(cart);
      res.redirect("https://buy-or-sell-by-yourself.netlify.app/success");
    } else {
      res.status(400).send({
        message: linePayRes,
      });
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
};
