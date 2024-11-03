'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: Sequelize.ENUM('ISA', 'Pension', 'GIA', 'Real Estate'),
      sub_category: Sequelize.ENUM('Stocks and Shares ISA', 'Cash ISA', 'Lifetime ISA', 'GIA', 'Workplace Pension', 'Self Invested Personal Pension', 'Real Estate', ''),
      provider: Sequelize.ENUM('Fidelity', 'AJ Bell', 'Freetrade', 'Aviva', 'ShettyWealth'),
      product_tax_wrapper_categories_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_tax_wrapper_types',
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
    await queryInterface.dropTable('products');
  }
};
