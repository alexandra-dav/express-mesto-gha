const { statusCodeName } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeName.ERROR_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
