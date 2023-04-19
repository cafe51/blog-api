const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET not set in .env'); })();

const sign = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { email: payload } }, secret, jwtConfig);
  return token;
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
