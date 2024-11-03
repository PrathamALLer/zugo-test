const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      google_oauth: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      underscored: true,
    }
  );

  return User;
};
