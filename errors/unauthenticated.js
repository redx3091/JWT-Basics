const CustomAPIError = require('./custom-error');
const { StatusCode } = require('http-status-codes');

class Unauthenticated extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCode.UNAUTHORIZED
  }
}

module.exports = Unauthenticated;
