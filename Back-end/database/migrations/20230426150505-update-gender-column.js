/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'gender', {
      type: Sequelize.ENUM('male', 'female', 'other'),
      allowNull: true,
    });
  },
};
