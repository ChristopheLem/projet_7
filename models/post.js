const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db')

class Post extends Model{}
Post.init({
  // paramters
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
  },
  dislikes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
  },
  userId: {
      type: Sequelize.INTEGER,
      allowNull: false
  }
}, {
  timestamps: true,
  modelName: 'posts',
  sequelize
});  

Post.sync()

module.exports = Post

