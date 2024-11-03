const Joi = require('joi');

const personPlanCreateSchema = Joi.object({
  relationship: Joi.string().valid('Owner', 'Adviser', 'Other Member').required(),
  plan_id: Joi.number().integer().positive().required(),
  person_id: Joi.number().integer().positive().required(),
});

const personPlanUpdateSchema = Joi.object({
  relationship: Joi.string().valid('Owner', 'Adviser', 'Other Member').required(),
  plan_id: Joi.number().integer().positive().optional(),
  person_id: Joi.number().integer().positive().optional(),
});

const validatePersonPlanCreate = (data) => {
  return personPlanCreateSchema.validate(data, { abortEarly: false });
};

const validatePersonPlanUpdate = (data) => {
  return personPlanUpdateSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validatePersonPlanCreate,
  validatePersonPlanUpdate,
};
