'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('plan', [
      {
        plan_name: 'Retirement Plan',
        plan_description: 'Plan for retirement savings',
        category: 'Discretionary',
        subcategory: 'Sapphire',
        risk_profile_id: 1,
        model_portfolio_id: 1,
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plan', null, {});
  }
};
