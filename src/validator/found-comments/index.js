const InvariantError = require('../../exceptions/InvariantError');
const { FoundCommentPayloadSchema } = require('./schema');

const FoundCommentsValidator = {
  validateFoundCommentPayload: (payload) => {
    const validateResult = FoundCommentPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = FoundCommentsValidator;
