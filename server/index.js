const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dovenv = require("dotenv");
dovenv.config();
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./routes").product;
const cartRoutes = require("./routes").cart;
const authRoutes = require("./routes").auth;
const passport = require("passport");
require("./config/passport")(passport);

/***** Connect To Mongo DB Altas *****/
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

/***** Middleware *****/
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST, PUT, DELETE",
};
app.use(cors(corsOptions));
app.use(morgan("dev")); // HTTP request logger middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false, // true : any type || false : string or array
  })
);
app.use("/files", express.static(path.join(__dirname, "/files")));
app.use("/api/user", authRoutes);
app.use(
  "/api/product",
  passport.authenticate("jwt", { session: false }),
  productRoutes
);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Arise MERN Developers",
  });
});

/***** Connect To port 8080 *****/
const port = process.env.PORT || 8080; // Whatever is in the environment variable PORT, or 8080 if there's nothing there.
app.listen(port, () => {
  console.log(`Application is Running on ${port}`);
});
