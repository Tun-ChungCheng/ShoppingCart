const router = require("express").Router();
const orderController = require("../controllers").order;

router
  .post("/linePay/createOrder", orderController.createOrder)
  .get("/linePay/confirm", orderController.confirmOrder);

module.exports = router;
