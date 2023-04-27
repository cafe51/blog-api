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
      await this.callServiceMethod(req, res, 201, this.service.createNewBlogPost({
        userId: req.user.id, ...req.body,
      }));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  updatePost = async (req, res) => {
    try {
      await this.service.updatePost(req.params.id, req.body);
      await this.callServiceMethod(req, res, 200, this.service.getPostById(req.params.id));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  deletePost = async (req, res) => {
    try {
      await this.callServiceMethod(req, res, 204, this.service.deletePost(req.params.id));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = BlogPostController;
