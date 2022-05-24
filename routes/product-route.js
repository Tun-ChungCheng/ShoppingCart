const router = require("express").Router();
const productController = require("../controller");
const multerInstance = require("../config/multer");
router.post(
  "/",
  multerInstance.upload.single("image"),
  productController.createProduct
);

module.exports = router;
