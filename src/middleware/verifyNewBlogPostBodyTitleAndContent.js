const { mapError } = require('../utils/errorMap');

const verifyNewBlogPostBodyTitleAndContent = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!(title && content)) {
      return res.status(mapError('BAD_REQUEST')).json({ message: 'Some required fields are missing' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyNewBlogPostBodyTitleAndContent,
};
