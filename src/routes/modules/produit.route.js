const { Router } = require('express');
const controller = require('../../controllers/produit.controller');
const validateMiddleware = require('../../middlewares/validate.middleware');
const uploadMiddleware = require('../../middlewares/upload.middleware');
const ProduitValidator = require('../../validators/produit.validator');

class ProduitRoute {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      '/',
      uploadMiddleware.singleImage('image'),
      ProduitValidator.create(),
      validateMiddleware.handle,
      controller.create
    );
    this.router.get('/', controller.findAll);
    this.router.get('/:id', controller.findById);
    this.router.put('/:id', ProduitValidator.update(), validateMiddleware.handle, controller.update);
    this.router.delete('/:id', controller.delete);
    this.router.patch('/:id/increment', ProduitValidator.stock(), validateMiddleware.handle, controller.increment);
    this.router.patch('/:id/decrement', ProduitValidator.stock(), validateMiddleware.handle, controller.decrement);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ProduitRoute();
