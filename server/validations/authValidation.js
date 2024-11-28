const Joi = require("joi");

// Login Schema
const loginschema = Joi.object({
  username: Joi.string().email().required(), // Validate username as an email
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#$%^*_\\-+!]{6,30}$"))
    .required(),
});

// Register Schema (with role validation)
const registerschema = Joi.object({
  username: Joi.string().email().required(), // Validate username as an email
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#$%^*_\\-+!]{6,30}$"))
    .required(),
  role: Joi.string()
    .valid("admin", "user", "moderator") // Validate role as one of the three options
    .required(),
});

module.exports = {
  loginschema,
  registerschema,
};
