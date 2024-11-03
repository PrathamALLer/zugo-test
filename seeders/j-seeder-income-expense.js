'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('income_expense', [
      {
        category: 'Salary',
        subcategory: 'Employment',
        source: 'Company XYZ',
        bookvalue: 50000.00,
        currency: 'GBP',
        income_or_expense: 'Income',
        salary_sacrifice: 0.00,
        external_contribution: 0.00,
        person_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('income_expense', null, {});
  }
};
