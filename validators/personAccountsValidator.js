const Joi = require('joi');

const createPersonAccountsSchema = Joi.object({
  person_id: Joi.number().integer().positive().required(),
  account_id: Joi.number().integer().positive().required(),
  role: Joi.string().valid('Owner', 'Advisor').required(),
  role_percentage: Joi.number().precision(2).min(0).max(100).required(),
});

const updatePersonAccountsSchema = Joi.object({
  person_id: Joi.number().integer().positive().optional(),
  account_id: Joi.number().integer().positive().optional(),
  role: Joi.string().valid('Owner', 'Advisor').optional(),
  role_percentage: Joi.number().precision(2).min(0).max(100).optional(),
});

module.exports = {
  validateCreatePersonAccount: (data) => createPersonAccountsSchema.validate(data),
  validateUpdatePersonAccount: (data) => updatePersonAccountsSchema.validate(data),
};
