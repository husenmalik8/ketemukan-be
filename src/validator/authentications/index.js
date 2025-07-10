const InvariantError = require('../../exceptions/InvariantError');
const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./schema');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validateResult = PostAuthenticationPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },

  validatePutAuthenticationPayload: (payload) => {
    const validateResult = PutAuthenticationPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },

  validateDeleteAuthenticationPayload: (payload) => {
    const validateResult = DeleteAuthenticationPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
