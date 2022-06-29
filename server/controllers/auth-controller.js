const registerValidation = require("../config/validation").registerValidation;
const loginValidation = require("../config/validation").loginValidation;
const profileUpdateValidation =
  require("../config/validation").profileUpdateValidation;
const authRepository = require("../repositories").authRepository;
const bcrypt = require("bcrypt");
const jwt = require("jsonWebToken");

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let email = req.body.email;
  const emailExist = await authRepository.findUser(email);

  if (emailExist)
    return res.status(400).send("Email has already been registered.");

  try {
    let payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const user = await authRepository.createUser(payload);
    res.status(200).send({
      status: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let email = req.body.email;
    const user = await authRepository.findUser(email);

    if (!user) return res.status(400).send("Email doesn't exist.");
    else
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, _email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          res.status(401).send("Wrong password.");
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.updatePofile = async (req, res) => {
  const { error } = profileUpdateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    let payload = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      avatar: req.file.path,
    };
    //console.log(payload);
    const user = await authRepository.updateUser(payload);
    res.status(200).send({
      status: true,
      data: user,
    });
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.getPofile = async (req, res) => {
  try {
    let id = req.params.id;
    let profile = await authRepository.getUser(id);
    res.status(200).json({
      status: true,
      data: profile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};
