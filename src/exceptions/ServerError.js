const HttpError = require('./HttpError');

class ServerError extends HttpError {
  constructor(message) {
    super(message, 500, 'error');

    this.name = 'ServerError';
  }
}

module.exports = ServerError;
