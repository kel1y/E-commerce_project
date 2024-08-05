/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.removeColumn('Products', 'categoryName'),

  down: async (queryInterface, Sequelize) => queryInterface.addColumn('Products', 'categoryName', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
};

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'categoryName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  };