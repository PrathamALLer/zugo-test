const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RiskProfile extends Model {}

  RiskProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      min_score: DataTypes.DECIMAL,
      score: DataTypes.DECIMAL,
      max_score: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'RiskProfile',
      tableName: 'risk_profile',
      underscored: true,
    }
  );

  return RiskProfile;
};
