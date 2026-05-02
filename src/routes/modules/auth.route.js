const { Router } = require('express');
const authController = require('../../controllers/auth.controller');
const validateMiddleware = require('../../middlewares/validate.middleware');
const AuthValidator = require('../../validators/auth.validator');

class AuthRoute {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/register', AuthValidator.register(), validateMiddleware.handle, authController.register);
    this.router.post('/login', AuthValidator.login(), validateMiddleware.handle, authController.login);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AuthRoute();
