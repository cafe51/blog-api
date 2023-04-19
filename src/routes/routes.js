const express = require('express');
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/user', userRoutes);

module.exports = routes;
