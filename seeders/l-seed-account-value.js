'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('account_value', [
      {
        bookvalue: 1000.00,
        account_id: 1,
        currency: 'GBP',
        iscurrent: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('account_value', null, {});
  }
};
