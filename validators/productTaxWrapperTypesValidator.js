const Joi = require('joi');

// Create schema: all fields required
const productTaxWrapperTypesCreateSchema = Joi.object({
  name: Joi.string().required(),
  annual_accumulation_allowance: Joi.number().precision(2).allow(null),
  annual_decumulation_allowance: Joi.number().precision(2).allow(null),
  income_tax_applicable: Joi.string().valid('Y', 'N').required(),
  capital_gains_tax_applicable: Joi.string().valid('Y', 'N').required(),
  max_tax_free_withdrawal: Joi.number().precision(2).allow(null),
  max_tax_free_withdrawal_percent_annual: Joi.number().precision(2).min(0).max(100).allow(null),
  min_withdraw_age: Joi.number().integer().min(0).allow(null),
  min_contribute_age: Joi.number().integer().min(0).allow(null),
  max_contribution_age: Joi.number().integer().min(0).allow(null),
});

// Update schema: all fields optional
const productTaxWrapperTypesUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  annual_accumulation_allowance: Joi.number().precision(2).allow(null).optional(),
  annual_decumulation_allowance: Joi.number().precision(2).allow(null).optional(),
  income_tax_applicable: Joi.string().valid('Y', 'N').optional(),
  capital_gains_tax_applicable: Joi.string().valid('Y', 'N').optional(),
  max_tax_free_withdrawal: Joi.number().precision(2).allow(null).optional(),
  max_tax_free_withdrawal_percent_annual: Joi.number().precision(2).min(0).max(100).allow(null).optional(),
  min_withdraw_age: Joi.number().integer().min(0).allow(null).optional(),
  min_contribute_age: Joi.number().integer().min(0).allow(null).optional(),
  max_contribution_age: Joi.number().integer().min(0).allow(null).optional(),
});

// Validation functions
function validateProductTaxWrapperTypeCreate(data) {
  return productTaxWrapperTypesCreateSchema.validate(data, { abortEarly: false });
}

function validateProductTaxWrapperTypeUpdate(data) {
  return productTaxWrapperTypesUpdateSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validateProductTaxWrapperTypeCreate,
  validateProductTaxWrapperTypeUpdate,
};
