'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.createTable('Carts', {
       id: {
         allowNull: false,
         primaryKey: true,
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV4,
       },
       items: {
         allowNull: true,
         type: Sequelize.JSON,
       },
       cartTotal: {
         allowNull: true,
         type: Sequelize.FLOAT,
       },
       buyer_id: {
         type: Sequelize.UUID,
         references: {
           model: 'Users',
           key: 'id',
         },
       },
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE,
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE,
       },
     });
   
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Carts');

  }
};
