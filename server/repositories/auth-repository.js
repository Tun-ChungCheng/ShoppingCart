const User = require("../models").userModel;

exports.findUser = async (userEmail) => {
  const user = User.findOne({ email: userEmail });
  return user;
};

exports.createUser = async (payload) => {
  const newUser = await User.create(payload);
  return newUser;
};

exports.updateUser = async (payload) => {
  const user = await User.findOneAndUpdate(
    { email: payload.email },
    {
      username: payload.username,
      password: payload.password,
      avatar: payload.avatar,
    },
    { new: true }
  );
  return user;
};

exports.getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};
