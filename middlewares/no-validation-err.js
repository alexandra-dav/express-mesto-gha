// const ERROR_VALIDATION = require('../utils/constants');

class NoValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = NoValidationError;
