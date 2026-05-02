const approvisionnementService = require('../services/approvisionnement.service');

class ApprovisionnementController {
  async create(req, res, next) {
    try {
      const data = await approvisionnementService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const data = await approvisionnementService.findAll();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const data = await approvisionnementService.findById(Number(req.params.id));
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await approvisionnementService.update(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await approvisionnementService.delete(Number(req.params.id));
      res.status(200).json({ success: true, message: 'Approvisionnement supprime' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ApprovisionnementController();
