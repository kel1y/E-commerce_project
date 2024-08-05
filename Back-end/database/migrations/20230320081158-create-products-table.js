const User = require('../models/user');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Products', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        productName: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        categoryName: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },

        description: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        images: {
          type: Sequelize.ARRAY(Sequelize.TEXT),
          allowNull: true,
          validate: {
            notEmpty: false,
          },
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        availability: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        expiryDate: {
          type: Sequelize.DATE,
          allowNull: true,
          validate: {
            notEmpty: false,
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        category_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Categories',
            key: 'id',
          },
        },
        seller_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};