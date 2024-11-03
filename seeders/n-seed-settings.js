'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Settings', [
      {
        setting_name: 'Default Currency',
        setting_value: 'GBP',
        priority: 1,
        product_tax_wrapper_categories_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Settings', null, {});
  }
};
