const router = require("express").Router();
const orderController = require("../controllers").order;
require("../config/linepay");

router.post("/", orderController.createOrder);

module.exports = router;
