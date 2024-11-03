const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {}

  Settings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      setting_name: DataTypes.STRING,
      setting_value: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      product_tax_wrapper_categories_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Settings',
      tableName: 'Settings',
      underscored: true,
    }
  );

  Settings.associate = function(models) {
    this.belongsTo(models.ProductTaxWrapperTypes, { foreignKey: 'product_tax_wrapper_categories_id' });
  };

  return Settings;
};
