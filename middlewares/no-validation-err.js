const { statusCode } = require('../utils/constants');

class NoValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.ERROR_VALIDATION;
  }
}

module.exports = NoValidationError;
