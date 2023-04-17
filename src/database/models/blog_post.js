const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'user_id', as: 'users' });

      this.belongsToMany(models.category, {
        through: models.posts_categories,
        foreignKey: 'post_id',
        as: 'categories',
      });
    }
  }
  BlogPost.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'blog_post',
    timestamps: false,
  });
  return BlogPost;
};
