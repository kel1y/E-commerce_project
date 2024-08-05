/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: '0da3d632-a09e-42d5-abda-520aea82ef49',
          categoryName: 'Category1',
          createdAt: new Date(),
          updatedAt: new Date(),

        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
