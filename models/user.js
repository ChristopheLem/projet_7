const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db')


// USER Model
class User extends Model{}
User.init({
  // paramters
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false
  }
}, {
  timestamps: false,
  modelName: 'users',
  sequelize
});

User.sync();

module.exports = User
