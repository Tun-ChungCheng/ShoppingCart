const router = require("express").Router();
const productController = require("../controllers").product;
const multerInstance = require("../config/multer");

router.post(
  "/",
  multerInstance.upload.single("image"),
  productController.createProduct
);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
