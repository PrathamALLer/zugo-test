const Joi = require('joi');

// Base schema
const baseAccountSchema = {
  accountnumber: Joi.number().integer().required(),
  accounttype: Joi.string().required(),
  currency: Joi.string().valid('GBP').required(),
  dateopened: Joi.date().iso().required(),
  dateclosed: Joi.string().allow(null, ''),
  accountstatus: Joi.string().valid('Active', 'Closed', 'Pending Close', 'Pending Active').required(),
  lasttransactiondate: Joi.date().iso().allow(null),
  notes: Joi.string().allow(null, ''),
  model_portfolio_id: Joi.number().integer().allow(null),
  risk_profile_id: Joi.number().integer().allow(null),
  Custided: Joi.string().valid('Y', 'N').required(),
  asset_or_liability: Joi.string().valid('Asset', 'Liability').required(),
  products_id: Joi.number().integer().allow(null),
};

// Create schema
const createAccountSchema = Joi.object(baseAccountSchema);

// Update schema
const updateAccountSchema = Joi.object({
  ...baseAccountSchema,
  accountnumber: Joi.number().integer().optional(), // accountnumber might not be required for updates
  accounttype: Joi.string().optional(),
  currency: Joi.string().valid('GBP').optional(),
  dateopened: Joi.date().iso().optional(),
  accountstatus: Joi.string().valid('Active', 'Closed', 'Pending Close', 'Pending Active').optional(),
  Custided: Joi.string().valid('Y', 'N').optional(),
  asset_or_liability: Joi.string().valid('Asset', 'Liability').optional(),
});

// Validation functions
const validateCreateAccount = (data) => {
  return createAccountSchema.validate(data, { abortEarly: false });
};

const validateUpdateAccount = (data) => {
  return updateAccountSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreateAccount,
  validateUpdateAccount,
};
