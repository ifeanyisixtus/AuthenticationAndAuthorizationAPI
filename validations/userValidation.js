const Joi = require("joi");

const userValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("guest", "admin").default("guest"),
});

module.exports = userValidation;
