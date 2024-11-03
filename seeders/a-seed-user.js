'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedpassword',
        google_oauth: JSON.stringify({}),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'hashedpassword',
        google_oauth: JSON.stringify({}),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
