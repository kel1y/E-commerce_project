/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '57409d12-ddad-4938-a37a-c17bc33aa4ba',
          email: 'gatete@gmail.com',
          role: 'seller',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          isVerified: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '57409d12-ddad-4938-a37a-c17bc22aa4bc',
          email: 'mukakalisajeanne@gmail.com',
          role: 'seller',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          isVerified: true,
          status: true,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '60409d12-ddad-4938-a37a-c17bc33aa4ba',
          email: 'kirengaboris5@gmail.com',
          role: 'seller',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          status: 'true',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'dbc8fb75-2bd9-4e49-90d5-01ebdd4076e2',
          email: 'kylesjet1@gmail.com',
          password:
            '$2b$10$CmTI8plpPwMC74n4pnod3..JErxlHetqkQqrhTuiwqt9KXC1rV52W',
          role: 'seller',
          isVerified: true,
          createdAt: '2023-03-17T10:16:59.334Z',
          updatedAt: '2023-03-17T10:16:59.334Z',
        },
        {
          id: '80ccebd5-7907-4840-a6af-5a738e8f1d35',
          email: 'boris@gmail.com',
          role: 'admin',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          isVerified: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '81ccebd5-7907-4940-a6af-5a738e8f1d39',
          email: 'eric@gmail.com',
          role: 'admin',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          isVerified: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '81ccebd5-7907-4940-a6af-5a738e8f1d31',
          email: 'dean@gmail.com',
          role: 'buyer',
          firstname: 'Dean',
          lastname: 'MURENZI',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          avatar: 'https://picsum.photos/id/26/4209/2769',

          status: true,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '81ccbbd5-7907-4940-a6af-5a738f8e1d39',
          email: 'umuntu@gmail.com',
          role: 'buyer',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          status: true,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '41dcbbd5-7907-4940-a6ae-2a738f8e1d34',
          email: 'pacstudios39@gmail.com',
          role: 'seller',
          password:
            '$2a$10$5OSUvABuuOMC5aVqUOrO5.oX07qTeQBz/LX2EtifOrsT3gw2UuJzS', // 1234
          status: true,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
