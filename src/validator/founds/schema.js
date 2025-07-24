const Joi = require('joi');

const FoundPayloadSchema = Joi.object({
  title: Joi.string().required(),
  shortDesc: Joi.string().required(),
  description: Joi.string().required(),
  foundDate: Joi.string().required(),
  categoryId: Joi.string().required(),
  locationId: Joi.string().required(),
});

const PutFoundPayloadSchema = Joi.object({
  title: Joi.string().required(),
  shortDesc: Joi.string().required(),
  description: Joi.string().required(),
  foundDate: Joi.string().required(),
  status: Joi.string().required(),

  longitude: Joi.string().allow(null),
  latitude: Joi.string().allow(null),

  categoryId: Joi.string().required(),
  locationId: Joi.string().required(),
});

module.exports = { FoundPayloadSchema, PutFoundPayloadSchema };
