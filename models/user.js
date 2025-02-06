const {hashPassword, comparePassword} = require('../helper/bcyrpt')
'use strict';
const {
  Model,
  Op
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: `Please input username`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        contains:{
          args:'@',
          msg: `Please input valid email`
        },
        notEmpty:{
          msg: `Please input your email!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: `Please input password`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: `Please select your role`
        }
      }
    },
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