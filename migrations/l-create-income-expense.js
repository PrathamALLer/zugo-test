'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('income_expense', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: Sequelize.ENUM('Salary', 'Bonus', 'Rent', 'Mortgage', 'Non Essentials', 'Property'),
      subcategory: Sequelize.ENUM('Employment', 'Property', ''),
      source: Sequelize.STRING,
      bookvalue: Sequelize.DECIMAL,
      currency: Sequelize.ENUM('GBP'),
      income_or_expense: Sequelize.ENUM('Income', 'Expense'),
      salary_sacrifice: Sequelize.DECIMAL,
      external_contribution: Sequelize.DECIMAL,
      person_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'person',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('income_expense');
  }
};
