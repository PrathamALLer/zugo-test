const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PersonAccounts extends Model {}

  PersonAccounts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      person_id: DataTypes.INTEGER,
      account_id: DataTypes.INTEGER,
      role: DataTypes.ENUM('Owner', 'Advisor'),
      role_percentage: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'PersonAccounts',
      tableName: 'person_accounts',
      underscored: true,
    }
  );

  PersonAccounts.associate = function(models) {
    this.belongsTo(models.Person, { foreignKey: 'person_id' });
    this.belongsTo(models.Account, { foreignKey: 'account_id' });
  };

  return PersonAccounts;
};
