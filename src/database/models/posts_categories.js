const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostsCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.blog_post, {
        foreignKey: 'post_id',
        as: 'blog_posts',
      });
      this.belongsTo(models.category, {
        foreignKey: 'category_id',
        as: 'categories',
      });
    }
  }
  PostsCategories.init({
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'posts_categories',
    tableName: false,
  });
  return PostsCategories;
};
