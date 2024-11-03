'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('transactions', [
      {
        description: 'Initial Deposit',
        trade_date: new Date('2023-01-01'),
        completed_date: new Date('2023-01-02'),
        account_id: 1,
        total_amount: 1000.00,
        category: 'Invest Cash',
        trade_currency: 'GBP',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
