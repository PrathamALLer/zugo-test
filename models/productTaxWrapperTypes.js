const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductTaxWrapperTypes extends Model {}

  ProductTaxWrapperTypes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      annual_accumulation_allowance: DataTypes.DECIMAL,
      annual_decumulation_allowance: DataTypes.DECIMAL,
      income_tax_applicable: DataTypes.ENUM('Y', 'N'),
      capital_gains_tax_applicable: DataTypes.ENUM('Y', 'N'),
      max_tax_free_withdrawal: DataTypes.DECIMAL,
      max_tax_free_withdrawal_percent_annual: DataTypes.DECIMAL,
      min_withdraw_age: DataTypes.INTEGER,
      min_contribute_age: DataTypes.INTEGER,
      max_contribution_age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProductTaxWrapperTypes',
      tableName: 'product_tax_wrapper_types',
      underscored: true,
    }
  );

  return ProductTaxWrapperTypes;
};
