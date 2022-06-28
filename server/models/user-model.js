const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Include the username."],
    minlength: [3, "Username can't be less then 3."],
    maxlength: [50, "Username can't be more then 50."],
  },
  email: {
    type: String,
    required: [true, "Please Include the email."],
    minlength: [6, "Email can't be less then 6."],
    maxlength: [100, "Email can't be more then 100."],
  },
  password: {
    type: String,
    required: [true, "Please Include the password."],
    minlength: [6, "Password can't be less then 6."],
    maxlength: [1024, "Password can't be more then 1024."],
  },
  role: {
    type: String,
    required: [true, "Please Include the role."],
    enum: ["customer", "seller"],
  },
  avatar: {
    type: String,
    default: "as",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Identify Role
userSchema.methods.isCustomer = function () {
  return this.role == "customer";
};

// Identify Role
userSchema.methods.isSeller = function () {
  return this.role == "seller";
};

// Identify Role
userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};

// Mongoose Schema Middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err, isMatch);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
