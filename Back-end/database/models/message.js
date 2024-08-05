/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'sender_id' });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      sender_id: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  return Message;
};
