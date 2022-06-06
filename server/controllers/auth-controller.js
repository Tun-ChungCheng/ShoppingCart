const registerValidation = require("../config/validation").registerValidation;
const loginValidation = require("../config/validation").loginValidation;
const authRepository = require("../repositories").authRepository;
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Check the validation of data.
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if the user exists.
  let email = req.body.email;
  const emailExist = await authRepository.findUser(email);
  if (emailExist)
    return res.status(400).send("Email has already been registered.");

  // Register the user
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
  // Check the validation of data
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
