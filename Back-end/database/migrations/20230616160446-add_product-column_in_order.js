"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "products", {
      type: Sequelize.ARRAY(Sequelize.JSONB),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "products");
  },
};
