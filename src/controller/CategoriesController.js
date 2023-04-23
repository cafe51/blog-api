class CategoriesController {
  constructor(service) {
    this.service = service;
  }

  getAllcategories = async (_req, res) => {
    try {
      const { status, payload } = await this.service.getAllcategories();
      if (status) return res.status(status).json({ message: payload });
      return res.status(200).json(payload);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  createNewCategory = async (req, res) => {
    try {
      const { status, payload } = await this.service.createNewCategory(req.body);
      if (status) return res.status(status).json({ message: payload });
      return res.status(201).json(payload);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = CategoriesController;
