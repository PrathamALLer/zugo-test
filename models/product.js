const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: DataTypes.ENUM('ISA', 'Pension', 'GIA', 'Real Estate'),
      sub_category: DataTypes.ENUM('Stocks and Shares ISA', 'Cash ISA', 'Lifetime ISA', 'GIA', 'Workplace Pension', 'Self Invested Personal Pension', 'Real Estate', ''),
      provider: DataTypes.ENUM('Fidelity', 'AJ Bell', 'Freetrade', 'Aviva', 'ShettyWealth'),
      product_tax_wrapper_categories_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      underscored: true,
    }
  );

  Product.associate = function(models) {
    this.belongsTo(models.ProductTaxWrapperTypes, { foreignKey: 'product_tax_wrapper_categories_id' });
  };

  return Product;
};
