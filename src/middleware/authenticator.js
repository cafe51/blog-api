const { mapError } = require('../utils/errorMap');
const { validateToken } = require('../utils/jwt');

// const secret = process.env.JWT_SECRET;

const authenticator = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(mapError('UNAUTHORIZED')).json({ message: 'Token not found' });
  }

  try {
    const { user } = validateToken(token);

    req.user = user;

    next();
    return null;
  } catch (err) {
    return res.status(mapError('UNAUTHORIZED')).json({ message: 'Expired or invalid token', error: err.message });
  }
};

module.exports = {
  authenticator,
};
