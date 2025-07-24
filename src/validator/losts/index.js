const InvariantError = require('../../exceptions/InvariantError');
const { LostPayloadSchema, PutLostPayloadSchema } = require('./schema');

const LostsValidator = {
  validateLostPayload: (payload) => {
    const validateResult = LostPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },

  validatePutLostPayload: (payload) => {
    const validateResult = PutLostPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = LostsValidator;
