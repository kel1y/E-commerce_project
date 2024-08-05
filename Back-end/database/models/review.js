const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'buyer_id' });
      Review.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      ratings: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      feedback: {
        type: DataTypes.STRING,
      },
      buyer_id: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Review',
    },
  );

  Review.beforeCreate((review) => {
    review.id = uuidv4();
  });

  return Review;
};
