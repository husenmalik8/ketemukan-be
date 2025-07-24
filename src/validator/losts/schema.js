const Joi = require('joi');

const LostPayloadSchema = Joi.object({
  title: Joi.string().required(),
  shortDesc: Joi.string().required(),
  description: Joi.string().required(),
  lostDate: Joi.string().required(),
  categoryId: Joi.string().required(),
  locationId: Joi.string().required(),
});

const PutLostPayloadSchema = Joi.object({
  title: Joi.string().required(),
  shortDesc: Joi.string().required(),
  description: Joi.string().required(),
  lostDate: Joi.string().required(),
  status: Joi.string().required(),

  longitude: Joi.string().allow(null),
  latitude: Joi.string().allow(null),

  categoryId: Joi.string().required(),
  locationId: Joi.string().required(),
});

module.exports = { LostPayloadSchema, PutLostPayloadSchema };
