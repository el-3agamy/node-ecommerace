const Joi = require("joi");

// Register validation schema
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(?:\+20|0)?1[0125]\d{8}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a valid Egyptian number",
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters, with letters and numbers",
    }),
  gender: Joi.string().valid("male", "female").required(),
  role: Joi.string().valid("client", "seller", "admin").default("client"),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
