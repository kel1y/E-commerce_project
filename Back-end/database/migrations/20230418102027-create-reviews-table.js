/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.createTable('Reviews',
      {
          id: {
         allowNull: false,
         primaryKey: true,
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV4,
       },
       ratings: {
         allowNull: true,
         type: Sequelize.INTEGER,
       },
       feedback: {
         allowNull: true,
         type: Sequelize.STRING,
       },
       buyer_id: {
         type: Sequelize.UUID,
         references: {
           model: 'Users',
           key: 'id',
         },
       },
       product_id: {
         type: Sequelize.UUID,
         references: {
           model: 'Products',
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
 
  
     await queryInterface.dropTable('Reviews');
     
  }
};
