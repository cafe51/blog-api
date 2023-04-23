const { blog_post: blogPost, user, category } = require('../database/models');

class BlogPostService {
  constructor() {
    this.modelBlogPost = blogPost;
    this.modelUser = user;
    this.modelCategory = category;
  }

  async getAllposts() {
    const posts = await this.modelBlogPost.findAll({
      include: [
        { model: this.modelUser, as: 'users', attributes: { exclude: ['password'] } },
        { model: this.modelCategory, as: 'categories', through: { attributes: [] } },
      ],
    });
    return { type: null, payload: posts };
  }

  async getPostById(id) {
    const posts = await this.modelBlogPost.findByPk(id, {
      include: [
        { model: this.modelUser, as: 'users', attributes: { exclude: ['password'] } },
        { model: this.modelCategory, as: 'categories', through: { attributes: [] } },
      ],

    });
    return { type: null, payload: posts };
  }
}

module.exports = BlogPostService;
