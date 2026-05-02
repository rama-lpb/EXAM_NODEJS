const { Router } = require('express');
const controller = require('../../controllers/approvisionnement.controller');
const validateMiddleware = require('../../middlewares/validate.middleware');
const ApprovisionnementValidator = require('../../validators/approvisionnement.validator');

class ApprovisionnementRoute {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/', ApprovisionnementValidator.create(), validateMiddleware.handle, controller.create);
    this.router.get('/', controller.findAll);
    this.router.get('/:id', controller.findById);
    this.router.put('/:id', ApprovisionnementValidator.update(), validateMiddleware.handle, controller.update);
    this.router.delete('/:id', controller.delete);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ApprovisionnementRoute();
