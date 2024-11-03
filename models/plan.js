const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {}

  Plan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      plan_name: DataTypes.STRING,
      plan_description: DataTypes.STRING,
      category: DataTypes.ENUM('Discretionary', 'Other'),
      subcategory: DataTypes.ENUM('Sapphire', 'Other'),
      risk_profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model_portfolio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: DataTypes.ENUM('Active', 'Completed', 'Dormant'),
    },
    {
      sequelize,
      modelName: 'Plan',
      tableName: 'plan',
      underscored: true,
      timestamps: true,
    }
  );

  Plan.associate = function(models) {
    this.belongsTo(models.RiskProfile, { foreignKey: 'risk_profile_id', as: 'riskProfile' });
    this.belongsTo(models.ModelPortfolio, { foreignKey: 'model_portfolio_id', as: 'modelPortfolio' });
  };

  return Plan;
};
