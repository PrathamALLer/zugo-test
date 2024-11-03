'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plan_name: Sequelize.STRING,
      plan_description: Sequelize.STRING,
      category: Sequelize.ENUM('Discretionary', ''),
      subcategory: Sequelize.ENUM('Sapphire'),
      risk_profile_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'risk_profile',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      model_portfolio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'model_portfolio',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: Sequelize.ENUM('Active', 'Completed', 'Dormant'),
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
    await queryInterface.dropTable('plan');
  }
};
