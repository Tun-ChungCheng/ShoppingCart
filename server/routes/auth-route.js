const router = require("express").Router();
const authController = require("../controllers").authController;
const multerInstance = require("../config/multer");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/:id", authController.getPofile);
router.patch(
  "/",
  multerInstance.upload.single("avatar"),
  authController.updatePofile
);

module.exports = router;
