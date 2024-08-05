/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          id: '0ec3d632-a09e-42e5-abda-520fed82ef57',
          buyer_id: 'dbc8fb75-2bd9-4e49-90d5-01ebdd4076e2', // kylesjet1@gmail.com
          status: 'successfull',
          total: 2800.0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
            id: "e918e9eb-4c12-417f-8e12-4ec6a0e5ae89",
            buyer_id: "81ccebd5-7907-4940-a6af-5a738e8f1d31",
            status: "successfull",
            total: 7000,
            createdAt: "2023-04-07T17:06:40.859Z",
            updatedAt: "2023-04-07T17:06:40.859Z"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
