'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('model_portfolio', [
      {
        name: 'Conservative Portfolio',
        description: 'Low risk portfolio',
        risk_profile_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('model_portfolio', null, {});
  }
};
