const { statusCodeName } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeName.ERROR_NOT_FOUND;
  }
}

module.exports = NotFoundError;
