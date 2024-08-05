const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'seller_id' });
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
    }
  }
  Product.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      expired: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false',
      },
      category_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
      seller_id: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );

  Product.beforeCreate((product) => {
    product.id = uuidv4();
  });

  return Product;
};
