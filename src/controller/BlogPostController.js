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
}

module.exports = BlogPostController;
