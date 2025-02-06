'use strict';
const {
  Model
} = require('sequelize');

const momentsAgo = require('../helper/momentAgo')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Tag, {foreignKey:"TagId"})
      Post.belongsTo(models.User, {foreignKey:"UserId"})
      Post.hasMany(models.Comment, {foreignKey:"PostId"})
    }
    get momentsAgo(){
      return momentsAgo(this.updatedAt)
    }
    static async getPostIncludingTagAndComment(Tag , Comment){
      try {
        let posts = await Post.findAll({
                        include: [
                        {model: Tag},  
                        {model: Comment}]
                    })
        return posts
      } catch (error) {
        throw error
      }
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    TagId: {
      type: DataTypes.INTEGER,
      references: {model:"Tags", key:"id"}
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {model:"Users",  key:"id"}
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};