const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccountValue extends Model {}

  AccountValue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bookvalue: DataTypes.DECIMAL,
      account_id: DataTypes.INTEGER,
      currency: DataTypes.ENUM('GBP'),
      iscurrent: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'AccountValue',
      tableName: 'account_value',
      underscored: true,
    }
  );

  AccountValue.associate = function(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id' });
  };

  return AccountValue;
};
