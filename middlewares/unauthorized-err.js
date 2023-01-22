const { statusCodeName } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeName.ERROR_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
