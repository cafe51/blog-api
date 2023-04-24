class CategoriesController {
  constructor(service) {
    this.service = service;
  }

  callServiceMethod = async (req, res, statusCode, serviceMethod) => {
    const { status, payload } = await serviceMethod;
    if (status) return res.status(status).json({ message: payload });
    return res.status(statusCode).json(payload);
  };

  getAllCategories = async (_req, res) => {
    try {
      await this.callServiceMethod(_req, res, 200, this.service.getAllCategories());
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  createNewCategory = async (req, res) => {
    try {
      await this.callServiceMethod(req, res, 201, this.service.createNewCategory(req.body));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = CategoriesController;
