const router = require("express").Router();
const authController = require("../controllers").auth;
const multerInstance = require("../config/multer");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.patch(
  "/",
  multerInstance.upload.single("avatar"),
  authController.updatePofile
);

router.get("/:id", authController.getPofile);

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("http://localhost:3000/home");
});
module.exports = router;
