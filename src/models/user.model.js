const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  motDePasse: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
