const Joi = require('joi');

// Schema for creating tax rates
const taxRatesCreateSchema = Joi.object({
  band: Joi.string().required(),
  taxable_income_min: Joi.number().precision(2).required(),
  taxable_income_max: Joi.number().precision(2).required(),
  tax_rate: Joi.number().precision(4).min(0).max(1).required(),
  jurisdiction_code: Joi.string().required(),
});

// Schema for updating tax rates
const taxRatesUpdateSchema = taxRatesCreateSchema.fork(['taxable_income_min', 'taxable_income_max'], (field) => field.optional());

const validateTaxRatesForCreate = (data) => {
  const { error, value } = taxRatesCreateSchema.validate(data);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  return value;
};

const validateTaxRatesForUpdate = (data) => {
  const { error, value } = taxRatesUpdateSchema.validate(data);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  return value;
};

// Export both validation functions
module.exports = {
  validateTaxRatesForCreate,
  validateTaxRatesForUpdate,
};
