const InvariantError = require('../../exceptions/InvariantError');
const { LostCommentPayloadSchema } = require('./schema');

const LostCommentsValidator = {
  validateLostCommentPayload: (payload) => {
    const validateResult = LostCommentPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = LostCommentsValidator;
