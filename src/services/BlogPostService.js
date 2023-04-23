const { blog_post: blogPost } = require('../database/models');

class BlogPostService {
  constructor() {
    this.model = blogPost;
  }

  async getAllposts() {
    const posts = await this.model.findAll();
    return { status: null, payload: posts };
  }
}

module.exports = BlogPostService;
