const sequelize = require('../config/database');
const User = require('./user.model');
const Fournisseur = require('./fournisseur.model');
const Produit = require('./produit.model');
const Approvisionnement = require('./approvisionnement.model');

Approvisionnement.belongsTo(Fournisseur, { foreignKey: 'fournisseurId', as: 'fournisseur' });
Fournisseur.hasMany(Approvisionnement, { foreignKey: 'fournisseurId', as: 'approvisionnements' });

Approvisionnement.belongsTo(Produit, { foreignKey: 'produitId', as: 'produit' });
Produit.hasMany(Approvisionnement, { foreignKey: 'produitId', as: 'approvisionnements' });

module.exports = {
  sequelize,
  User,
  Fournisseur,
  Produit,
  Approvisionnement
};
