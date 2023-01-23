const { statusCodeName } = require('../utils/constants');

class NoValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeName.ERROR_VALIDATION;
  }
}

module.exports = NoValidationError;
