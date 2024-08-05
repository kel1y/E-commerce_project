/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      order_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Orders',
          key: 'id'
        }
      },
      seller_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      status: {
        type: Sequelize.ENUM,
        values: ['approved', 'canceled', 'pending']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};
