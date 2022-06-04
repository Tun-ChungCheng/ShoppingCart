const router = require("express").Router();
const cartController = require("../controllers").cartController;

router.post("/", cartController.addItemToCart);
router.get("/", cartController.getCart);
module.exports = router;
