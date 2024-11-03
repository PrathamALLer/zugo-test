const Joi = require('joi');

// Create schema for creating a transaction
const createTransactionSchema = Joi.object({
  description: Joi.string().required(),
  trade_date: Joi.date().required(),
  completed_date: Joi.date(),
  account_id: Joi.number().integer().positive().required(),
  total_amount: Joi.number().precision(2).required(),
  category: Joi.string().valid('Invest Cash', 'Raise Cash').required(),
  trade_currency: Joi.string().valid('GBP').required(),
});

// Create schema for updating a transaction
const updateTransactionSchema = Joi.object({
  description: Joi.string(),
  trade_date: Joi.date(),
  completed_date: Joi.date(),
  account_id: Joi.number().integer().positive(),
  total_amount: Joi.number().precision(2),
  category: Joi.string().valid('Invest Cash', 'Raise Cash'),
  trade_currency: Joi.string().valid('GBP'),
});

// Separate validation functions
const validateCreateTransaction = (transaction) => {
  return createTransactionSchema.validate(transaction, { abortEarly: false });
};

const validateUpdateTransaction = (transaction) => {
  return updateTransactionSchema.validate(transaction, { abortEarly: false });
};

module.exports = {
  validateCreateTransaction,
  validateUpdateTransaction,
};
