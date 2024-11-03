'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('person', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      middlename: Sequelize.STRING,
      dateofbirth: Sequelize.DATE,
      gender: Sequelize.STRING,
      email: Sequelize.STRING,
      phonenumber: Sequelize.STRING,
      streetaddress: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      postalcode: Sequelize.INTEGER,
      country: Sequelize.STRING,
      modified_at: Sequelize.DATE,
      profilepictureurl: Sequelize.STRING,
      notes: Sequelize.STRING,
      category: Sequelize.ENUM('Client'),
      sub_category: Sequelize.STRING,
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('person');
  }
};
