const BlogPostService = require('../services/BlogPostService');

const blogPostService = new BlogPostService();

const USERID = 'user_id';

const verifyIfUserOwnsThePost = async (req, res, next) => {
  try {
    const blogPostId = req.params.id;
    const userFromToken = req.user;

    const { status, payload: blogPostFound } = await blogPostService.getPostById(blogPostId);

    if (status) return res.status(status).json({ message: blogPostFound });
    if (blogPostFound.dataValues[USERID] !== userFromToken.id) return res.status(401).json({ message: 'Unauthorized user' });

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyIfUserOwnsThePost,
};
