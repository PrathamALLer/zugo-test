'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('contribution_withdrawals', [
      {
        person_id: 1,
        plan_id: 1,
        account_id: 1,
        start_date: new Date('2023-01-01'),
        end_date: new Date('2023-12-31'),
        amount: '100.00',
        currency: 'GBP',
        frequency: 'Month',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contribution_withdrawals', null, {});
  }
};
