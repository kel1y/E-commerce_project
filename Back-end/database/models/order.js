const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "buyer_id" });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      buyer_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
      },
      products: DataTypes.ARRAY(DataTypes.JSONB),
      status: {
        type: DataTypes.ENUM,
        values: ["successfull", "pending", "canceled", "processing"],
      },
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
