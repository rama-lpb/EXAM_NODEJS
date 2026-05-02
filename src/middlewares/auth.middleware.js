const jwt = require('jsonwebtoken');
const env = require('../config/env');
const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');

class AuthMiddleware {
  handle(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: ErrorMessages.TOKEN_MANQUANT
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, env.jwt.secret);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: ErrorMessages.TOKEN_INVALIDE
      });
    }
  }
}

module.exports = new AuthMiddleware();
