'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasOne(models.User, {foreignKey:"ProfileId"})
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    bornDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};