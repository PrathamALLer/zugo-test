const Joi = require('joi');

// Create schema requires all fields
const createContributionWithdrawalsSchema = Joi.object({
  person_id: Joi.number().integer().positive().required(),
  plan_id: Joi.number().integer().positive().required(),
  account_id: Joi.number().integer().positive().required(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().min(Joi.ref('start_date')).allow(null),
  amount: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(),
  currency: Joi.string().valid('GBP').required(),
  frequency: Joi.string().valid('One Time', 'Month', 'Annual', 'Quarter').required(),
});

// Update schema allows some fields to be optional
const updateContributionWithdrawalsSchema = Joi.object({
  person_id: Joi.number().integer().positive(),
  plan_id: Joi.number().integer().positive(),
  account_id: Joi.number().integer().positive(),
  start_date: Joi.date().iso(),
  end_date: Joi.date().iso().min(Joi.ref('start_date')).allow(null),
  amount: Joi.string().pattern(/^\d+(\.\d{1,2})?$/),
  currency: Joi.string().valid('GBP'),
  frequency: Joi.string().valid('One Time', 'Month', 'Annual', 'Quarter'),
});

// Validator functions
function validateCreateContributionWithdrawal(data) {
  return createContributionWithdrawalsSchema.validate(data, { abortEarly: false });
}

function validateUpdateContributionWithdrawal(data) {
  return updateContributionWithdrawalsSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validateCreateContributionWithdrawal,
  validateUpdateContributionWithdrawal,
};
