'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('product_tax_wrapper_types', [
      {
        name: 'Standard Wrapper',
        annual_accumulation_allowance: 20000.00,
        annual_decumulation_allowance: 10000.00,
        income_tax_applicable: 'Y',
        capital_gains_tax_applicable: 'Y',
        max_tax_free_withdrawal: 5000.00,
        max_tax_free_withdrawal_percent_annual: 25.00,
        min_withdraw_age: 55,
        min_contribute_age: 18,
        max_contribution_age: 75,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_tax_wrapper_types', null, {});
  }
};
