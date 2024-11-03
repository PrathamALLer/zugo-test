'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaxRates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      band: Sequelize.STRING,
      taxable_income_min: Sequelize.DECIMAL,
      taxable_income_max: Sequelize.DECIMAL,
      tax_rate: Sequelize.DECIMAL,
      jurisdiction_code: Sequelize.STRING,
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
    await queryInterface.dropTable('TaxRates');
  }
};
