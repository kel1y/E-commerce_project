/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    static associate(models) {
      Search.belongsTo(models.User, { foreignKey: 'buyer_id' });
    }
  }
  Search.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    buyer_id: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    products: DataTypes.ARRAY(DataTypes.UUID)
  }, {
    sequelize,
    modelName: 'Search',
  });
  Search.beforeCreate((user) => {
    user.id = uuidv4();
  });
  return Search;
};