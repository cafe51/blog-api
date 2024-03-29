const { Op } = require('sequelize');
const {
  blog_post: blogPost,
  posts_categories: postCategories,
  user,
  category,
} = require('../database/models');

const USERID = 'user_id';
const POSTID = 'post_id';
const CATEGORYID = 'category_id';

class BlogPostService {
  constructor() {
    this.modelBlogPost = blogPost;
    this.modelUser = user;
    this.modelCategory = category;
    this.modelPostCategories = postCategories;
  }

  async getAllposts() {
    const posts = await this.modelBlogPost.findAll({
      include: [
        { model: this.modelUser, as: 'users', attributes: { exclude: ['password'] } },
        { model: this.modelCategory, as: 'categories', through: { attributes: [] } },
      ],
    });
    return { status: null, payload: posts };
  }

  async getPostById(id) {
    const post = await this.modelBlogPost.findByPk(id, {
      include: [
        { model: this.modelUser, as: 'users', attributes: { exclude: ['password'] } },
        { model: this.modelCategory, as: 'categories', through: { attributes: [] } },
      ],

    });
    if (!post) return { status: 404, payload: 'Post does not exist' };
    return { status: null, payload: post };
  }

  async getPostByQueryService(q) {
    const posts = await this.modelBlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: [
        { model: this.modelUser, as: 'users', attributes: { exclude: ['password'] } },
        { model: this.modelCategory, as: 'categories', through: { attributes: [] } },
      ],
    });
    return { type: null, payload: posts };
  }

  async createNewPostCategoriesAssociation(postId, categoryIds) {
    const createPromises = categoryIds.map((categoryId) => this.modelPostCategories.create({
      [POSTID]: postId,
      [CATEGORYID]: categoryId,
    }));

    await Promise.all(createPromises);
  }

  async createNewBlogPost({
    userId, title, content, categoryIds,
  }) {
    const newUser = await this.modelBlogPost.create({
      title,
      content,
      [USERID]: userId,
      updated: new Date().toISOString(),
      published: new Date().toISOString(),
    });

    await this.createNewPostCategoriesAssociation(newUser.dataValues.id, categoryIds);

    const userWithoutId = { ...newUser.dataValues };
    delete userWithoutId[USERID];

    const response = { userId, ...userWithoutId };

    return { status: null, payload: response };
  }

  async updatePost(id, body) {
    const { title, content } = body;
    await this.modelBlogPost
      .update({ title, content, updated: new Date().toISOString() }, { where: { id } });
  }

  async deletePost(id) {
    await this.modelBlogPost.destroy({ where: { id } });
    return { type: null, payload: 'Post deleted successfully' };
  }
}

module.exports = BlogPostService;
