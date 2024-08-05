/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'seller_id' });
      User.hasOne(models.Cart, { foreignKey: 'buyer_id' });
    }
    // User.hasOne(models.BillingAddress, { foreignKey: 'user_id' });
  }

  // eslint-disable-next-line require-jsdoc
  //   async checkPassword(password) {
  //     const match = await bcrypt.compare(password, this.password);
  //     return match;
  //   }
  // }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female', 'other'],
      },
      birthDate: DataTypes.DATEONLY,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      billingAddress: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      avatar: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'buyer',
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false',
      },
      lastPasswordUpdate: DataTypes.DATEONLY,
      PasswordExpired: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
    },
  );

  User.beforeCreate((user) => {
    user.id = uuidv4();
  });

  // eslint-disable-next-line func-names
  User.prototype.checkPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
  };

  return User;
};
