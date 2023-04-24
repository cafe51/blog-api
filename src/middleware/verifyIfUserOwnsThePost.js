const UserService = require('../services/UserService');
const BlogPostService = require('../services/BlogPostService');

const userService = new UserService();
const blogPostService = new BlogPostService();

const verifyIfUserOwnsThePost = async (req, res, next) => {
  try {
    const blogPostId = req.params.id;
    const userEmail = req.user;

    const { status, payload: blogPostFound } = await blogPostService.getPostById(blogPostId);
    const { payload: userFound } = await userService.getUserByEmail(userEmail);

    if (status) return res.status(status).json({ message: blogPostFound });
    if (blogPostFound.userId !== userFound.id) return res.status(401).json({ message: 'Unauthorized user' });

    console.log('BLOGPOST ', blogPostFound);

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyIfUserOwnsThePost,
};
