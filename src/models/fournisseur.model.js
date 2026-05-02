const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fournisseur = sequelize.define('Fournisseur', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  telephone: { type: DataTypes.STRING, allowNull: false },
  adresse: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'fournisseurs',
  timestamps: true
});

module.exports = Fournisseur;
