const Joi = require('joi');

const incomeExpenseCreateSchema = Joi.object({
  category: Joi.string().valid('Salary', 'Bonus', 'Rent', 'Mortgage', 'Non Essentials', 'Property').required(),
  subcategory: Joi.string().valid('Employment', 'Property', '').required(),
  source: Joi.string().required(),
  bookvalue: Joi.number().precision(2).required(),
  currency: Joi.string().valid('GBP').required(),
  income_or_expense: Joi.string().valid('Income', 'Expense').required(),
  salary_sacrifice: Joi.number().precision(2).allow(null),
  external_contribution: Joi.number().precision(2).allow(null),
  person_id: Joi.number().integer().positive().required(),
});

// New schema for updates
const incomeExpenseUpdateSchema = Joi.object({
  category: Joi.string().valid('Salary', 'Bonus', 'Rent', 'Mortgage', 'Non Essentials', 'Property').optional(),
  subcategory: Joi.string().valid('Employment', 'Property', '').optional(),
  source: Joi.string().optional(),
  bookvalue: Joi.number().precision(2).optional(),
  currency: Joi.string().valid('GBP').optional(),
  income_or_expense: Joi.string().valid('Income', 'Expense').optional(),
  salary_sacrifice: Joi.number().precision(2).allow(null).optional(),
  external_contribution: Joi.number().precision(2).allow(null).optional(),
  person_id: Joi.number().integer().positive().optional(),
});

module.exports = {
  validateIncomeExpenseCreate: (data) => incomeExpenseCreateSchema.validate(data, { abortEarly: false }),
  validateIncomeExpenseUpdate: (data) => incomeExpenseUpdateSchema.validate(data, { abortEarly: false }),
};
