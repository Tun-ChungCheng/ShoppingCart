const router = require("express").Router();
const authController = require("../controllers").auth;
const multerInstance = require("../config/multer");
// const passport = require("passport");
// const jwt = require("jsonWebToken");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.patch(
  "/",
  multerInstance.upload.single("avatar"),
  authController.updatePofile
);

/* Authenticate with a backend server */
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "select_account",
//   })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:3000/",
//   }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     const tokenObject = { _id: req.user._id, _email: req.user.email };
//     const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
//     res.cookie("user", {
//       success: true,
//       token: "JWT " + token,
//       user: req.user,
//     });
//     res.redirect("http://localhost:3000/home");
//   }
// );

router.get("/:id", authController.getPofile);

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("http://localhost:3000/home");
});
module.exports = router;
