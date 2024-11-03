const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class IncomeExpense extends Model {}

  IncomeExpense.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: DataTypes.ENUM('Salary', 'Bonus', 'Rent', 'Mortgage', 'Non Essentials', 'Property'),
      subcategory: DataTypes.ENUM('Employment', 'Property', ''),
      source: DataTypes.STRING,
      bookvalue: DataTypes.DECIMAL,
      currency: DataTypes.ENUM('GBP'),
      income_or_expense: DataTypes.ENUM('Income', 'Expense'),
      salary_sacrifice: DataTypes.DECIMAL,
      external_contribution: DataTypes.DECIMAL,
      person_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'IncomeExpense',
      tableName: 'income_expense',
      underscored: true,
    }
  );

  IncomeExpense.associate = function(models) {
    this.belongsTo(models.Person, { foreignKey: 'person_id' });
  };

  return IncomeExpense;
};
