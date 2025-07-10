const InvariantError = require('../../exceptions/InvariantError');
const { LostPayloadSchema } = require('./schema');

const LostsValidator = {
  validateLostPayload: (payload) => {
    const validateResult = LostPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = LostsValidator;
