const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {}

  Account.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      accountnumber: DataTypes.INTEGER,
      accounttype: DataTypes.STRING,
      currency: DataTypes.ENUM('GBP'),
      dateopened: DataTypes.DATE,
      dateclosed: DataTypes.STRING,
      accountstatus: DataTypes.ENUM('Active', 'Closed', 'Pending Close', 'Pending Active'),
      lasttransactiondate: DataTypes.DATE,
      notes: DataTypes.STRING,
      model_portfolio_id: DataTypes.INTEGER,
      risk_profile_id: DataTypes.INTEGER,
      Custodied: DataTypes.ENUM('Y', 'N'),
      asset_or_liability: DataTypes.ENUM('Asset', 'Liability'),
      products_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Account',
      tableName: 'account',
      underscored: true,
    }
  );

  Account.associate = function(models) {
    this.belongsTo(models.ModelPortfolio, { foreignKey: 'model_portfolio_id' });
    this.belongsTo(models.RiskProfile, { foreignKey: 'risk_profile_id' });
    this.belongsTo(models.Product, { foreignKey: 'products_id' });
  };

  return Account;
};
