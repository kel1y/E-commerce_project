'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blacklisToken extends Model {

    static associate(models) {
  
    }
  }
  blacklisToken.init({
    token: DataTypes.CHAR(5000)
  }, {
    sequelize,
    modelName: 'blacklisToken',
  });
  return blacklisToken;
};