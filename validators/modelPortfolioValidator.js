const Joi = require('joi');

const createModelPortfolioSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  risk_profile_id: Joi.number().integer().positive().required(),
});

const updateModelPortfolioSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('', null),
  risk_profile_id: Joi.number().integer().positive().optional(),
});

module.exports = {
  validateCreateModelPortfolio: (data) => createModelPortfolioSchema.validate(data),
  validateUpdateModelPortfolio: (data) => updateModelPortfolioSchema.validate(data),
};
