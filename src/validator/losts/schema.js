const Joi = require('joi');

const LostPayloadSchema = Joi.object({
  title: Joi.string().required(),
  shortDesc: Joi.string().required(),
  description: Joi.string().required(),
  lostDate: Joi.string().required(),
});

module.exports = { LostPayloadSchema };
