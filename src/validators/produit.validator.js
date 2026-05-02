const { body } = require('express-validator');

class ProduitValidator {
  static create() {
    return [
      body('libelle').notEmpty(),
      body('prixUnitaire').isFloat({ gt: 0 }),
      body('quantiteStock').optional().isInt({ min: 0 })
    ];
  }

  static update() {
    return [
      body('libelle').optional().notEmpty(),
      body('prixUnitaire').optional().isFloat({ gt: 0 }),
      body('quantiteStock').optional().isInt({ min: 0 })
    ];
  }

  static stock() {
    return [body('quantite').isInt({ gt: 0 })];
  }
}

module.exports = ProduitValidator;
