'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: Sequelize.STRING,
      trade_date: Sequelize.DATE,
      completed_date: Sequelize.DATE,
      account_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'account',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      total_amount: Sequelize.DECIMAL,
      category: Sequelize.ENUM('Invest Cash', 'Raise Cash'),
      trade_currency: Sequelize.ENUM('GBP'),
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
    await queryInterface.dropTable('transactions');
  }
};
