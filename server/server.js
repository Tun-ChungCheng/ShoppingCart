const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const productRoutes = require("./routes").product;
const cartRoutes = require("./routes").cart;
const authRoutes = require("./routes").auth;
const orderRoutes = require("./routes").order;
const passport = require("passport");
require("./config/passport");
/* Connect To Redis Cloud */
// require("./config/cache");

/* Connect To Mongo DB Altas */
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas sucessfully.");
  })
  .catch((e) => {
    console.log(e);
  });

/* Middleware */
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev")); // HTTP request logger middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true, // true : any type || false : string or array
  })
);
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/files", express.static(path.join(__dirname, "/files")));
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes, passport.authenticate("jwt"));
app.use("/api/cart", cartRoutes, passport.authenticate("jwt"));
app.use("/api/order", orderRoutes, passport.authenticate("jwt"));

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

/* Connect To port 8080 */
const port = process.env.PORT || 8080;
const hostname = "localhost";

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
