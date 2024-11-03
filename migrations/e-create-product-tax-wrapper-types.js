'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_tax_wrapper_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      annual_accumulation_allowance: Sequelize.DECIMAL,
      annual_decumulation_allowance: Sequelize.DECIMAL,
      income_tax_applicable: Sequelize.ENUM('Y', 'N'),
      capital_gains_tax_applicable: Sequelize.ENUM('Y', 'N'),
      max_tax_free_withdrawal: Sequelize.DECIMAL,
      max_tax_free_withdrawal_percent_annual: Sequelize.DECIMAL,
      min_withdraw_age: Sequelize.INTEGER,
      min_contribute_age: Sequelize.INTEGER,
      max_contribution_age: Sequelize.INTEGER,
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
    await queryInterface.dropTable('product_tax_wrapper_types');
  }
};
