const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produit = sequelize.define('Produit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  libelle: { type: DataTypes.STRING, allowNull: false },
  prixUnitaire: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantiteStock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  imageUrl: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'produits',
  timestamps: true
});

module.exports = Produit;
