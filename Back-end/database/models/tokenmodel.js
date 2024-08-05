const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tokenModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tokenModel.init({
    email: DataTypes.STRING,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tokenModel',
  });
  return tokenModel;
};
