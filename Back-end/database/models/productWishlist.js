/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class ProductWishlist extends Model {
    static associate(models) {
      ProductWishlist.belongsTo(models.User, { foreignKey: 'user_id' });
      ProductWishlist.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  ProductWishlist.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        },
      },
      product_id: {
        type: DataTypes.UUID,
        references: {
          model:
          'Product',
          key: 'id'
        },
      }
    },
    {
      sequelize,
      modelName: 'ProductWishlist',
    }
  );

  ProductWishlist.beforeCreate((product) => {
    product.id = uuidv4();
  });
  return ProductWishlist;
};
