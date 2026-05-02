const { body } = require('express-validator');

class AuthValidator {
  static register() {
    return [body('nom').notEmpty(), body('email').isEmail(), body('motDePasse').isLength({ min: 6 })];
  }

  static login() {
    return [body('email').isEmail(), body('motDePasse').notEmpty()];
  }
}

module.exports = AuthValidator;
