const {hashPassword, comparePassword} = require('../helper/bcyrpt')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Profile, {foreignKey:"ProfileId"})
      User.hasMany(models.Post, {foreignKey: "UserId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    ProfileId: {
      type:DataTypes.INTEGER,
      references: {model:"Profiles", key:"id"}
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((input, option) => {
    input.password = hashPassword(input.password)
  })

  return User;
};