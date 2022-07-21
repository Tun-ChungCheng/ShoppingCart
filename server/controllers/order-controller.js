const cartRepository = require("../repositories").cart;
const paypal = require("@paypal/checkout-server-sdk");
const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

exports.createOrder = async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    const cart = await cartRepository.cart();
    const total = cart.items
      .map((item) => item.total)
      .reduce((acc, next) => acc + next, 0);
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "NT",
            value: Number.parseInt(total, 10),
            breakdown: {
              item_total: {
                currency_code: "NT",
                value: Number.parseInt(total, 10),
              },
            },
          },
          items: cart.items.map((item) => {
            return {
              name: item.name,
              unit_amount: {
                currency_code: "NT",
                value: Number.parseInt(item.total, 10),
              },
              quantity: Number.parseInt(item.quantity, 10),
            };
          }),
        },
      ],
    });
    cart.items.map((item) => {
      console.log(item.name);
      console.log(item.total);
      console.log(item.quantity);
    });

    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
