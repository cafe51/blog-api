class UserController {
  constructor(service) {
    this.service = service;
  }

  getAllUsers = async (_req, res) => {
    try {
      const { status, payload } = await this.service.getAllUsers();
      if (status) return res.status(status).json({ message: payload });
      return res.status(200).json(payload);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  registerUser = async (req, res) => {
    try {
      const { body } = req;
      const { status, payload } = await this.service.registerUser(body);
      if (status) return res.status(status).json({ message: payload });
      return res.status(201).json({ token: payload });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = UserController;
