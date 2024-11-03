'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountnumber: Sequelize.INTEGER,
      accounttype: Sequelize.STRING,
      currency: Sequelize.ENUM('GBP'),
      dateopened: Sequelize.DATE,
      dateclosed: Sequelize.STRING,
      accountstatus: Sequelize.ENUM('Active', 'Closed', 'Pending Close', 'Pending Active'),
      lasttransactiondate: Sequelize.DATE,
      notes: Sequelize.STRING,
      model_portfolio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'model_portfolio',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      risk_profile_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'risk_profile',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      custodied: Sequelize.ENUM('Y', 'N'),
      asset_or_liability: Sequelize.ENUM('Asset', 'Liability'),
      products_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
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
    await queryInterface.dropTable('account');
  }
};
