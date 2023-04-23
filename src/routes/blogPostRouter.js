const express = require('express');
const BlogPostController = require('../controller/BlogPostController');
const BlogPostService = require('../services/BlogPostService');
const { authenticator } = require('../middleware/authenticator');

const router = express.Router();

const controller = new BlogPostController(new BlogPostService());

router
  .use(authenticator)
  // .post('/', controller.createNewPost)
  .get('/', controller.getAllposts);

module.exports = router;
