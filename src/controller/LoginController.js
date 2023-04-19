const UserService = require('../services/UserService');
const { loginValidator } = require('../utils/Validator');
const { sign } = require('../utils/jwt');

class LoginController {
  constructor() {
    this.service = new UserService();
  }

  login = async (req, res) => {
    try {
      const { email } = req.body;

      // if (!(email && password)) {
      //   return res.status(400).json({ message: 'Some required fields are missing' });
      // }

      const user = await this.service.getUserByEmail(email);
      if (user.status) return res.status(user.status).json({ message: user.payload });

      const validator = await loginValidator(req.body, user);
      if (validator.status) {
        return res
          .status(validator.status)
          .json({ message: validator.payload });
      }

      const token = sign(user.payload.dataValues.email);

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

module.exports = LoginController;
