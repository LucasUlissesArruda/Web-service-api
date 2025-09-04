// src/Infrastructure/Persistence/Sequelize/models/UserModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { // Armazenará o hash da senha
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true, // createdAt, updatedAt
});

module.exports = UserModel;