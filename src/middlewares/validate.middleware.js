const { validationResult } = require('express-validator');
const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');

class ValidateMiddleware {
  handle(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: ErrorMessages.VALIDATION_ERROR,
        errors: errors.array()
      });
    }

    return next();
  }
}

module.exports = new ValidateMiddleware();
