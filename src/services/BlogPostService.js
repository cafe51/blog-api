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

  async updatePostService(id, body) {
    const { title, content } = body;
    if (!title || !content) return { type: 400, payload: 'Some required fields are missing' };
    const post = await this.modelBlogPost.findByPk(id);
    if (!post) return { type: 404, payload: 'Post does not exist' };
    await post.update({ title, content });
    const updatedPost = await this.getPostById(id);
    return { type: null, payload: updatedPost.payload };
  };
}

module.exports = BlogPostService;
