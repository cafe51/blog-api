const express = require('express');
const BlogPostController = require('../controller/BlogPostController');
const BlogPostService = require('../services/BlogPostService');
const { authenticator } = require('../middleware/authenticator');
const { verifyNewBlogPostBodyCategories } = require('../middleware/verifyNewBlogPostBodyCategories');
const { verifyNewBlogPostBodyTitleAndContent } = require('../middleware/verifyNewBlogPostBodyTitleAndContent');
const { verifyIfUserOwnsThePost } = require('../middleware/verifyIfUserOwnsThePost');

const router = express.Router();

const controller = new BlogPostController(new BlogPostService());

router
  .use(authenticator)
  .post('/', verifyNewBlogPostBodyTitleAndContent, verifyNewBlogPostBodyCategories, controller.createNewBlogPost)
  .get('/', controller.getAllposts)
  .get('/:id', controller.getPostById)
  .put('/:id', verifyIfUserOwnsThePost, verifyNewBlogPostBodyTitleAndContent, controller.updatePost);

module.exports = router;
