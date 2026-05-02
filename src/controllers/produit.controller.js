const produitService = require('../services/produit.service');

class ProduitController {
  async create(req, res, next) {
    try {
      const data = await produitService.create(req.body, req.file);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const data = await produitService.findAll();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const data = await produitService.findById(Number(req.params.id));
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await produitService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await produitService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message: 'Produit supprime' });
    } catch (error) {
      next(error);
    }
  }

  async increment(req, res, next) {
    try {
      const data = await produitService.incrementStock(
        Number(req.params.id),
        Number(req.body.quantite)
      );
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async decrement(req, res, next) {
    try {
      const data = await produitService.decrementStock(
        Number(req.params.id),
        Number(req.body.quantite)
      );
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProduitController();
