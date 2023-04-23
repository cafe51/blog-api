const express = require('express');
const CategoriesController = require('../controller/CategoriesController');
const CategoriesService = require('../services/CategoriesService');
const { authenticator } = require('../middleware/authenticator');

const router = express.Router();

const controller = new CategoriesController(new CategoriesService());

router
  .use(authenticator)
  // .post('/', controller.registerUser)
  .get('/', controller.getAllcategories);

module.exports = router;
