const Joi = require('joi');

const planSchemas = {
  create: Joi.object({
    plan_name: Joi.string().required(),
    plan_description: Joi.string().required(),
    category: Joi.string().valid('Discretionary', '').required(),
    subcategory: Joi.string().valid('Sapphire').required(),
    risk_profile_id: Joi.number().integer().positive().required(),
    model_portfolio_id: Joi.number().integer().positive().required(),
    status: Joi.string().valid('Active', 'Completed', 'Dormant').required(),
  }),

  update: Joi.object({
    plan_name: Joi.string(),
    plan_description: Joi.string(),
    category: Joi.string().valid('Discretionary', ''),
    subcategory: Joi.string().valid('Sapphire'),
    risk_profile_id: Joi.number().integer().positive(),
    model_portfolio_id: Joi.number().integer().positive(),
    status: Joi.string().valid('Active', 'Completed', 'Dormant'),
  }),
};

const planValidator = (schema) => (payload) => {
  const { error } = schema.validate(payload, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return { error: errors };
  }
  return { value: payload };
};

module.exports = {
  validateCreatePlan: planValidator(planSchemas.create),
  validateUpdatePlan: planValidator(planSchemas.update),
};
