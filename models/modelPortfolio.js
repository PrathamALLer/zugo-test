const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModelPortfolio extends Model {}

  ModelPortfolio.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      risk_profile_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ModelPortfolio',
      tableName: 'model_portfolio',
      underscored: true,
    }
  );

  ModelPortfolio.associate = function(models) {
    this.belongsTo(models.RiskProfile, { foreignKey: 'risk_profile_id' });
  };

  return ModelPortfolio;
};
