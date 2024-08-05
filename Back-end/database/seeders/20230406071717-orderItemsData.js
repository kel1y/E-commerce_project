/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'OrderItems',
      [
        {
          id: '0ec2d632-d05e-42e5-abda-120fcd82ef52',
          order_id: '0ec3d632-a09e-42e5-abda-520fed82ef57',
          seller_id: '60409d12-ddad-4938-a37a-c17bc33aa4ba', // gatete
          product_id: '4b35a4b0-53e8-48a4-97b0-9d3685d3197c', // product 1
          status: 'approved',
          quantity: 2, // unit price=700
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '8dc2f332-d05e-42e5-abdc-220fcd82ef59',
          order_id: '0ec3d632-a09e-42e5-abda-520fed82ef57',
          seller_id: '60409d12-ddad-4938-a37a-c17bc33aa4ba', // gatete
          product_id: '926ade6c-21f7-4866-ae7f-360d1574839d', // product 2
          status: 'approved',
          quantity: 1, // unit price=1400
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '8dc2f332-d05e-42e5-abdc-220fcd82ef58',
          order_id: 'e918e9eb-4c12-417f-8e12-4ec6a0e5ae89',
          seller_id: '60409d12-ddad-4938-a37a-c17bc33aa4ba', // gatete
          product_id: '926ade6c-21f7-4866-ae7f-360d1574839e', // product 3
          status: 'approved',
          quantity: 1, // unit price=1400
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
