class UserController {
  constructor(service) {
    this.service = service;
  }

  callServiceMethod = async (req, res, statusCode, serviceMethod) => {
    const { status, payload } = await serviceMethod;
    if (status) return res.status(status).json({ message: payload });
    return res.status(statusCode).json(payload);
  };

  getAllUsers = async (_req, res) => {
    try {
      await this.callServiceMethod(_req, res, 200, this.service.getAllUsers());
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      await this.callServiceMethod(req, res, 200, this.service.getUserById(req.params.id));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  registerUser = async (req, res) => {
    try {
      await this.callServiceMethod(req, res, 200, this.service.registerUser(req.body));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = UserController;
