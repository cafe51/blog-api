const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.blog_post, {
        through: models.posts_categories,
        foreignKey: 'category_id',
        as: 'blog_posts',
      });
    }
  }
  Category.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'category',
    timestamps: false,
  });
  return Category;
};
