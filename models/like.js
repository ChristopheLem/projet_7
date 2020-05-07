const { Sequelize, Model } = require('sequelize');
const { sequelize }  = require('../config/db');

class Like extends Model {}
Like.init({
      // paramters
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  like: {
      type: Sequelize.INTEGER,
      defaultValue: 0
  },
  userIdLiked: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  postId: {
      type: Sequelize.INTEGER,
      allowNull: false
  }
}, {
    timestamps: false,
    modelName: 'likes',
    sequelize
})

Like.sync()

module.exports = Like;
