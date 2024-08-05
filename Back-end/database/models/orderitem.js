const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.User, { foreignKey: 'seller_id' });
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      order_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Order',
          key: 'id'
        }
      },
      seller_id: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      product_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Product',
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      status: {
        type: DataTypes.ENUM,
        values: ['approved', 'canceled', 'pending']
      }
    },
    {
      sequelize,
      modelName: 'OrderItem'
    }
  );
  return OrderItem;
};
