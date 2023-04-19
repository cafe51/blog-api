const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const sign = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const email = jwt.sign({ data: { email: payload } }, secret, jwtConfig);
  return email;
};

const validateToken = (token = null) => {
  if (!token) throw new Error('Token not found');

  const { data } = jwt.verify(token, secret);
  return data;
};

module.exports = {
  sign,
  validateToken,
};
