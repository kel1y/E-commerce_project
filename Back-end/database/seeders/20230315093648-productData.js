/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          id: '4b35a4b0-53e8-48a4-97b0-9d3685d3197c',
          productName: 'Product 1',
          description: 'Description 1',
          quantity: 10,
          price: 700,
          availability: true,
          images: ['https://picsum.photos/id/26/4209/2769'],
          seller_id: '60409d12-ddad-4938-a37a-c17bc33aa4ba',
          expired: false,
          expiryDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '926ade6c-21f7-4866-ae7f-360d1574839d',
          productName: 'Product 2',
          description: 'Description 2',
          quantity: 10,
          price: 1400,
          availability: true,
          seller_id: '60409d12-ddad-4938-a37a-c17bc33aa4ba',
          images: ['https://picsum.photos/id/26/4209/2769'],
          expired: false,
          expiryDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '926ade6c-21f7-4866-ae7f-360d1574839e',
          productName: 'Product 3',
          description: 'Description 3',
          quantity: 10,
          price: 1400,
          availability: true,
          seller_id: '60409d12-ddad-4938-a37a-c17bc33aa4ba',
          images: ['https://picsum.photos/id/26/4209/2769'],
          expired: false,
          expiryDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
