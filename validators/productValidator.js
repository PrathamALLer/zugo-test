const Joi = require('joi');

const createProductSchema = Joi.object({
  category: Joi.string()
    .valid('ISA', 'Pension', 'GIA', 'Real Estate')
    .required(),

  sub_category: Joi.string()
    .valid('Stocks and Shares ISA', 'Cash ISA', 'Lifetime ISA', 'GIA', 'Workplace Pension', 'Self Invested Personal Pension', 'Real Estate', '')
    .required(),

  provider: Joi.string()
    .valid('Fidelity', 'AJ Bell', 'Freetrade', 'Aviva', 'ShettyWealth')
    .required(),

  product_tax_wrapper_categories_id: Joi.number()
    .integer()
    .positive()
    .required(),
});

const updateProductSchema = Joi.object({
  category: Joi.string()
    .valid('ISA', 'Pension', 'GIA', 'Real Estate')
    .optional(),

  sub_category: Joi.string()
    .valid('Stocks and Shares ISA', 'Cash ISA', 'Lifetime ISA', 'GIA', 'Workplace Pension', 'Self Invested Personal Pension', 'Real Estate', '')
    .optional(),

  provider: Joi.string()
    .valid('Fidelity', 'AJ Bell', 'Freetrade', 'Aviva', 'ShettyWealth')
    .optional(),

  product_tax_wrapper_categories_id: Joi.number()
    .integer()
    .positive()
    .optional(),
});

const validateCreateProduct = (product) => {
  return createProductSchema.validate(product, { abortEarly: false });
};

const validateUpdateProduct = (product) => {
  return updateProductSchema.validate(product, { abortEarly: false });
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};
