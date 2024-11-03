const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {}

  Transactions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description: DataTypes.STRING,
      trade_date: DataTypes.DATE,
      completed_date: DataTypes.DATE,
      account_id: DataTypes.INTEGER,
      total_amount: DataTypes.DECIMAL,
      category: DataTypes.ENUM('Invest Cash', 'Raise Cash'),
      trade_currency: DataTypes.ENUM('GBP'),
    },
    {
      sequelize,
      modelName: 'Transactions',
      tableName: 'transactions',
      underscored: true,
    }
  );

  Transactions.associate = function(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id' });
  };

  return Transactions;
};
