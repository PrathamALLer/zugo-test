'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TaxRates', [
      {
        band: 'Basic',
        taxable_income_min: 0.00,
        taxable_income_max: 50000.00,
        tax_rate: 20.00,
        jurisdiction_code: 'UK',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TaxRates', null, {});
  }
};
