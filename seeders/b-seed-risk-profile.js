'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('risk_profile', [
      {
        name: 'Low Risk',
        description: 'Suitable for conservative investors',
        min_score: 0.0,
        score: 2.5,
        max_score: 5.0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('risk_profile', null, {});
  }
};
