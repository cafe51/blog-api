const { blog_post: blogPost, user, category } = require('../database/models');

const USERID = 'user_id';

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

  async createNewBlogPost({
    title, content, categoryId, userId,
  }) {
    const newUser = await this.modelBlogPost.create({
      title,
      content,
      categoryId,
      [USERID]: userId,
      updated: new Date().toISOString(),
      published: new Date().toISOString(),
    });

    const userWithoutId = { ...newUser.dataValues };
    delete userWithoutId[USERID];

    const response = { userId, ...userWithoutId };

    return { type: null, payload: response };
  }
}

module.exports = BlogPostService;
