const express = require('express');
const BlogPostController = require('../controller/BlogPostController');
const BlogPostService = require('../services/BlogPostService');
const { authenticator } = require('../middleware/authenticator');
const { verifyNewBlogPostBody } = require('../middleware/verifyNewBlogPostBody');

const router = express.Router();

const controller = new BlogPostController(new BlogPostService());

router
  .use(authenticator)
  .post('/', verifyNewBlogPostBody, controller.createNewBlogPost)
  .get('/', controller.getAllposts)
  .get('/:id', controller.getPostById);

module.exports = router;
