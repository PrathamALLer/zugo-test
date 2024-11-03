const Joi = require('joi');

const schemas = {
  create: Joi.object({
    setting_name: Joi.string().required(),
    setting_value: Joi.string().required(),
    Priority: Joi.number().integer().min(0),
    product_tax_wrapper_categories_id: Joi.number().integer().min(1).allow(null),
  }),

  update: Joi.object({
    setting_name: Joi.string(),
    setting_value: Joi.string(),
    Priority: Joi.number().integer().min(0),
    product_tax_wrapper_categories_id: Joi.number().integer().min(1).allow(null),
  }),
};

const validateCreateSettings = (data) => {
  return schemas.create.validate(data);
};

const validateUpdateSettings = (data) => {
  return schemas.update.validate(data);
};

module.exports = {
  validateCreateSettings,
  validateUpdateSettings,
};
