const Joi = require('joi');

const accountValueSchemaCreate = Joi.object({
  bookvalue: Joi.number().precision(2).required(),
  account_id: Joi.number().integer().positive().required(),
  currency: Joi.string().valid('GBP').required(),
  iscurrent: Joi.boolean().required(),
});

const accountValueSchemaUpdate = Joi.object({
  bookvalue: Joi.number().precision(2).optional(),
  account_id: Joi.number().integer().positive().optional(),
  currency: Joi.string().valid('GBP').optional(),
  iscurrent: Joi.boolean().optional(),
});

const validateAccountValueCreate = (data) => {
  return accountValueSchemaCreate.validate(data, { abortEarly: false });
};

const validateAccountValueUpdate = (data) => {
  return accountValueSchemaUpdate.validate(data, { abortEarly: false });
};

module.exports = {
  validateAccountValueCreate,
  validateAccountValueUpdate,
};
