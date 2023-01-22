const { statusCodeName } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodeName.ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
