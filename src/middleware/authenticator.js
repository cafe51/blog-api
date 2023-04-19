// const jwt = require('jsonwebtoken');
const { validateToken } = require('../utils/jwt');

// const secret = process.env.JWT_SECRET;

const authenticator = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { email } = validateToken(token);

    req.user = email;

    next();
    return null;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token', error: err.message });
  }
};

module.exports = {
  authenticator,
};
