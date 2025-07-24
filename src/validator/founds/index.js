const InvariantError = require('../../exceptions/InvariantError');
const { FoundPayloadSchema, PutFoundPayloadSchema } = require('./schema');

const FoundsValidator = {
  validateFoundPayload: (payload) => {
    const validateResult = FoundPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },

  validatePutFoundPayload: (payload) => {
    const validateResult = PutFoundPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = FoundsValidator;
