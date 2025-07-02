const HttpError = require('./HttpError');

class InvariantError extends HttpError {
  constructor(message) {
    super(message);

    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
