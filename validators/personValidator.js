const Joi = require('joi');

const personSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  middlename: Joi.string().allow('', null),
  dateofbirth: Joi.date().iso(),
  gender: Joi.string(),
  email: Joi.string().email(),
  phonenumber: Joi.string(),
  streetaddress: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  postalcode: Joi.number().integer(),
  country: Joi.string(),
  profilepictureurl: Joi.string().uri(),
  notes: Joi.string(),
  category: Joi.string().valid('Client'),
  sub_category: Joi.string(),
  user_id: Joi.number().integer(),
});

const validatePerson = (person) => {
  return personSchema.validate(person, { abortEarly: false });
};

module.exports = {
  validatePerson,
};
