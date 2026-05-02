const { body } = require('express-validator');

class ApprovisionnementValidator {
  static create() {
    return [
      body('date').isISO8601(),
      body('quantite').isInt({ gt: 0 }),
      body('fournisseurId').isInt({ gt: 0 }),
      body('produitId').isInt({ gt: 0 })
    ];
  }

  static update() {
    return [
      body('date').optional().isISO8601(),
      body('quantite').optional().isInt({ gt: 0 }),
      body('fournisseurId').optional().isInt({ gt: 0 }),
      body('produitId').optional().isInt({ gt: 0 })
    ];
  }
}

module.exports = ApprovisionnementValidator;
