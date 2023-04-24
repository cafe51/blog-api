const { mapError } = require('../utils/errorMap');

const verifyNewBlogPostBody = (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
      return res.status(mapError('BAD_REQUEST')).json({ message: 'Some required fields are missing' });
    }
    next();
    return null;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyNewBlogPostBody,
};
