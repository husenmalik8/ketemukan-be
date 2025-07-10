const Joi = require('joi');

const LostCommentPayloadSchema = Joi.object({
  comment: Joi.string().required(),
});

module.exports = { LostCommentPayloadSchema };
