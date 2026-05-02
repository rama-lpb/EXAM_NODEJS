const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Approvisionnement = sequelize.define('Approvisionnement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  quantite: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'approvisionnements',
  timestamps: true
});

module.exports = Approvisionnement;
