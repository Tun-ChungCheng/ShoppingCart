const router = require("express").Router();
const authController = require("../controllers").authController;
const multerInstance = require("../config/multer");
const passport = require("passport");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.patch(
  "/",
  multerInstance.upload.single("avatar"),
  authController.updatePofile
);
/* Authenticate with a backend server */

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/home");
  }
);

router.get("/:id", authController.getPofile);

module.exports = router;
