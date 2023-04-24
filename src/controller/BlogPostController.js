const UserService = require('../services/UserService');

class BlogPostController {
  constructor(service) {
    this.service = service;
  }

  getAllposts = async (_req, res) => {
    try {
      const { status, payload } = await this.service.getAllposts();
      if (status) return res.status(status).json({ message: payload });
      return res.status(200).json(payload);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getPostById = async (req, res) => {
    try {
      const { status, payload } = await this.service.getPostById(req.params.id);
      if (status) return res.status(status).json({ message: payload });
      return res.status(200).json(payload);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  createNewBlogPost = async (req, res) => {
    try {
      const userResponse = await new UserService().getUserByEmail(req.user);
      const { status, payload } = await this.service.createNewBlogPost({
        userId: userResponse.payload.dataValues.id, ...req.body,
      });
      if (status) return res.status(status).json({ message: payload });
      return res.status(201).json(payload);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  updatePostService = async (req, res) => {
    try {
      await this.service.updatePostService(req.params.id, req.body);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = BlogPostController;
