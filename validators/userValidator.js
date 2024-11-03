const Joi = require('joi');

// Create user schema
const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  google_oauth: Joi.object().optional(),
});

// Update user schema
const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  google_oauth: Joi.object().optional(),
});

const validateCreateUser = (userData) => {
  return createUserSchema.validate(userData);
};

const validateUpdateUser = (userData) => {
  return updateUserSchema.validate(userData);
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
