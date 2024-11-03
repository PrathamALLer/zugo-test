const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Person extends Model {}

  Person.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      middlename: DataTypes.STRING,
      dateofbirth: DataTypes.DATE,
      gender: DataTypes.STRING,
      email: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      streetaddress: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postalcode: DataTypes.INTEGER,
      country: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      profilepictureurl: DataTypes.STRING,
      notes: DataTypes.STRING,
      category: DataTypes.ENUM('Client'),
      sub_category: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Person',
      tableName: 'person',
      underscored: true,
    }
  );

  Person.associate = function(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Person;
};
