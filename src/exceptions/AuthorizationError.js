const HttpError = require('./HttpError');

class AuthorizationError extends HttpError {
  constructor(message) {
    super(message, 403, 'fail');

    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
