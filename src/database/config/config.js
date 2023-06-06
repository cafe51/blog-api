const dotenv = require('dotenv');

dotenv.config();

const config = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'blog_database',
  host: process.env.MYSQL_HOST || 'db',
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
