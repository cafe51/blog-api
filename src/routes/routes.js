const express = require('express');
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const blogPostRouter = require('./blogPostRouter');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/user', userRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/post', blogPostRouter);

module.exports = routes;
