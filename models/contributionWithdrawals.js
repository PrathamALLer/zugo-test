const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContributionWithdrawals extends Model {}

  ContributionWithdrawals.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      person_id: DataTypes.INTEGER,
      plan_id: DataTypes.INTEGER,
      account_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      amount: DataTypes.STRING,
      currency: DataTypes.ENUM('GBP'),
      frequency: DataTypes.ENUM('One Time', 'Month', 'Annual', 'Quarter'),
    },
    {
      sequelize,
      modelName: 'ContributionWithdrawals',
      tableName: 'contribution_withdrawals',
      underscored: true,
    }
  );

  ContributionWithdrawals.associate = function(models) {
    this.belongsTo(models.Person, { foreignKey: 'person_id' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
    this.belongsTo(models.Account, { foreignKey: 'account_id' });
  };

  return ContributionWithdrawals;
};
