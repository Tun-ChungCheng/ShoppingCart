const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name can't be less then 3."],
    maxlength: [50, "Name can't be more then 50."],
    require: [true, "Please Include the product name."],
  },
  price: {
    type: Number,
    minlength: [1, "Price can't be less then 1."],
    maxlength: [9999999999, "Price can't be more then 9999999999."],
    require: [true, "Please Include the product price."],
  },
  description: {
    type: String,
    maxlength: [800, "Name can't be more then 800."],
    require: [true, "Please Include the product description."],
  },
  image: {
    type: String,
    require: [true, "Please Include the product image."],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customer: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
