'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('account', [
      {
        accountnumber: 123456789,
        accounttype: 'Savings',
        currency: 'GBP',
        dateopened: new Date('2020-01-01'),
        dateclosed: null,
        accountstatus: 'Active',
        lasttransactiondate: new Date(),
        notes: 'Primary savings account',
        model_portfolio_id: 1,
        risk_profile_id: 1,
        custodied: 'Y',
        asset_or_liability: 'Asset',
        products_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('account', null, {});
  }
};
