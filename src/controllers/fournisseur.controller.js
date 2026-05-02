const fournisseurService = require('../services/fournisseur.service');

class FournisseurController {
  async create(req, res, next) {
    try {
      const data = await fournisseurService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const data = await fournisseurService.findAll();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const data = await fournisseurService.findById(Number(req.params.id));
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await fournisseurService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await fournisseurService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message: 'Fournisseur supprime' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FournisseurController();
