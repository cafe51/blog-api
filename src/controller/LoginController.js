const { loginAuthenticator, emailAndPasswordValidator } = require('../utils/validator');
const { sign } = require('../utils/jwt');

class LoginController {
  constructor(service) {
    this.service = service;
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      await emailAndPasswordValidator(email, password);

      const user = await this.service.getUserByEmail(email);
      if (user.status) {
        return res
          .status(user.status)
          .json({ message: user.payload });
      }

      const authentication = await loginAuthenticator(req.body, user);
      if (authentication.status) {
        return res
          .status(authentication.status)
          .json({ message: authentication.payload });
      }

      const token = sign(user.payload.dataValues.email);

      return res
        .status(200)
        .json({ token });
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message });
    }
  };
}

module.exports = LoginController;
