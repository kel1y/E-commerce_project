/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Searches', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      buyer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      products: {
        type: Sequelize.ARRAY(Sequelize.UUID)
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
    await queryInterface.dropTable('Searches');
  }
};