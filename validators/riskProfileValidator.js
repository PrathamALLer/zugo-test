const Joi = require('joi');

const riskProfileSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  min_score: Joi.number().precision(2).required(),
  score: Joi.number().precision(2).required(),
  max_score: Joi.number().precision(2).required(),
});

module.exports = {
  validateRiskProfile: (data) => riskProfileSchema.validate(data),
};
