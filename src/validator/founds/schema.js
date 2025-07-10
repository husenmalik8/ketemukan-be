const Joi = require('joi');

const FoundPayloadSchema = Joi.object({
  title: Joi.string().required(),
  shortDesc: Joi.string().required(),
  description: Joi.string().required(),
  foundDate: Joi.string().required(),
});

module.exports = { FoundPayloadSchema };
