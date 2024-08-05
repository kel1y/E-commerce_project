/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.ENUM('male', 'female', 'other'),
      }),
      queryInterface.addColumn('Users', 'birthDate', {
        type: Sequelize.DATEONLY,
      }),
      queryInterface.addColumn('Users', 'preferredLanguage', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Users', 'preferredCurrency', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Users', 'billingAddress', {
        type: Sequelize.JSON,
      }),
      queryInterface.addColumn('Users', 'avatar', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      }),
      queryInterface.addColumn('Users', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      }),
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'birthDate'),
      queryInterface.removeColumn('Users', 'preferredLanguage'),
      queryInterface.removeColumn('Users', 'preferredCurrency'),
      queryInterface.removeColumn('Users', 'billingAddress'),
      queryInterface.removeColumn('Users', 'avatar'),
      queryInterface.removeColumn('Users', 'deletedAt'),
    ]);
  },
};
