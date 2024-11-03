const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaxRates extends Model {}

  TaxRates.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      band: DataTypes.STRING,
      taxable_income_min: DataTypes.DECIMAL,
      taxable_income_max: DataTypes.DECIMAL,
      tax_rate: DataTypes.DECIMAL,
      jurisdiction_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'TaxRates',
      tableName: 'TaxRates',
      underscored: true,
    }
  );

  return TaxRates;
};
