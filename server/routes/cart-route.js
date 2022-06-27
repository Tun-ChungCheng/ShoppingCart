const router = require("express").Router();
const cartController = require("../controllers").cartController;

router.get("/", cartController.getCart);
router.post("/", cartController.addItemToCart);
router.delete("/:_id", cartController.deleteItemFromCart);

module.exports = router;
