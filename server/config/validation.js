const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const profileUpdateValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().min(1).max(9999999999).required(),
    description: Joi.string().max(30).required(),
    seller: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.profileUpdateValidation = profileUpdateValidation;
module.exports.productValidation = productValidation;
