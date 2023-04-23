const express = require('express');
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const categoriesRoutes = require('./categoriesRoutes');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/user', userRoutes);
routes.use('/categories', categoriesRoutes);

module.exports = routes;
