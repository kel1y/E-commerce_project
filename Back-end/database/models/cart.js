const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'buyer_id' });
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      items: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      cartTotal: {
        type: DataTypes.FLOAT,
      },
      buyer_id: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  );

  Cart.beforeCreate((cart) => {
    cart.id = uuidv4();
  });

  return Cart;
};
