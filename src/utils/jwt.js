const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET || 'secretJWT';

const sign = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { user: payload } }, secret, jwtConfig);
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
