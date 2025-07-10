const Joi = require('joi');

const FoundCommentPayloadSchema = Joi.object({
  comment: Joi.string().required(),
});

module.exports = { FoundCommentPayloadSchema };
