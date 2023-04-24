const UserService = require('../services/UserService');

class BlogPostController {
  constructor(service) {
    this.service = service;
  }

  callServiceMethod = async (req, res, statusCode, serviceMethod) => {
    const { status, payload } = await serviceMethod;
    if (status) return res.status(status).json({ message: payload });
    return res.status(statusCode).json(payload);
  };

  getAllposts = async (_req, res) => {
    try {
      await this.callServiceMethod(_req, res, 200, this.service.getAllposts());
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getPostById = async (req, res) => {
    try {
      await this.callServiceMethod(req, res, 200, this.service.getPostById(req.params.id));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  createNewBlogPost = async (req, res) => {
    try {
      const userResponse = await new UserService().getUserByEmail(req.user);
      await this.callServiceMethod(req, res, 201, this.service.createNewBlogPost({
        userId: userResponse.payload.dataValues.id, ...req.body,
      }));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  updatePostService = async (req, res) => {
    try {
      await this.service.updatePostService(req.params.id, req.body);
      await this.callServiceMethod(req, res, 200, this.service.getPostById(req.params.id));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = BlogPostController;
