const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PersonPlan extends Model {}

  PersonPlan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      relationship: DataTypes.ENUM('Owner', 'Adviser', 'Other Member'),
      plan_id: DataTypes.INTEGER,
      person_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'PersonPlan',
      tableName: 'person_plan',
      underscored: true,
    }
  );

  PersonPlan.associate = function(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
    this.belongsTo(models.Person, { foreignKey: 'person_id' });
  };

  return PersonPlan;
};
