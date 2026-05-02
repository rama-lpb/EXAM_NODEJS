const { body } = require('express-validator');

class FournisseurValidator {
  static create() {
    return [
      body('id').not().exists().withMessage("Le champ 'id' ne doit pas etre envoye"),
      body('nom').notEmpty().withMessage('Le nom est obligatoire'),
      body('telephone').notEmpty().withMessage('Le telephone est obligatoire'),
      body('adresse').notEmpty().withMessage("L'adresse est obligatoire")
    ];
  }

  static update() {
    return [
      body('id').not().exists().withMessage("Le champ 'id' ne doit pas etre modifie"),
      body('nom').optional().notEmpty().withMessage('Le nom ne peut pas etre vide'),
      body('telephone').optional().notEmpty().withMessage('Le telephone ne peut pas etre vide'),
      body('adresse').optional().notEmpty().withMessage("L'adresse ne peut pas etre vide")
    ];
  }
}

module.exports = FournisseurValidator;
