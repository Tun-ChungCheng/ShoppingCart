const User = require("../models").userModel;

exports.findUser = async (userEmail) => {
  const user = User.findOne({ email: userEmail });
  return user;
};

exports.createUser = async (payload) => {
  const newUser = await User.create(payload);
  return newUser;
};
