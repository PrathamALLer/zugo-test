'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('person', [
      {
        firstname: 'John',
        lastname: 'Doe',
        middlename: 'A',
        dateofbirth: new Date('1990-01-01'),
        gender: 'Male',
        email: 'john.doe@example.com',
        phonenumber: '1234567890',
        streetaddress: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        postalcode: 12345,
        country: 'USA',
        modified_at: new Date(),
        profilepictureurl: 'http://example.com/johndoe.jpg',
        notes: 'Test user',
        category: 'Client',
        sub_category: 'VIP',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('person', null, {});
  }
};
