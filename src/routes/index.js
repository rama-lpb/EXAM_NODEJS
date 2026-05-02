const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const authRoute = require('./modules/auth.route');
const fournisseurRoute = require('./modules/fournisseur.route');
const produitRoute = require('./modules/produit.route');
const approvisionnementRoute = require('./modules/approvisionnement.route');

class ApiRouter {
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.use('/auth', authRoute.getRouter());
    this.router.use('/fournisseurs', authMiddleware.handle, fournisseurRoute.getRouter());
    this.router.use('/produits', authMiddleware.handle, produitRoute.getRouter());
    this.router.use('/approvisionnements', authMiddleware.handle, approvisionnementRoute.getRouter());
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ApiRouter().getRouter();
