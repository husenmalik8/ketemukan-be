const HttpError = require('./HttpError');

class AuthenticationError extends HttpError {
  constructor(message) {
    super(message, 401, 'fail');

    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
