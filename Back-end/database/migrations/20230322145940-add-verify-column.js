/* eslint-disable linebreak-style */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'isVerified');
  },
};
