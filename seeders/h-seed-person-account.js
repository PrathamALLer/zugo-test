'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('person_accounts', [
      {
        person_id: 1,
        account_id: 1,
        role: 'Owner',
        role_percentage: 100.00,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('person_accounts', null, {});
  }
};
