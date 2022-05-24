const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Include the product name."],
  },
  price: {
    type: Number,
    require: [true, "Please Include the product price."],
  },
  image: {
    type: String,
    require: [true, "Please Include the product image."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/***** Export Product Model *****/
module.exports = mongoose.model("Product", productSchema);
