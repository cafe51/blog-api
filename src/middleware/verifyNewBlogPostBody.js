const { mapError } = require('../utils/errorMap');
const CategoriesService = require('../services/CategoriesService');

async function findCategoryById(id) {
  const categoriesService = new CategoriesService();
  const category = await categoriesService.getCategoryById(id);
  return category;
}

async function validateCategoryIds(categoryIds) {
  const categoriesFound = await Promise.all(categoryIds.map(findCategoryById));
  return categoriesFound.every((category) => category.payload);
}

const checkRequiredFields = (title, content, categoryIds) => title && content && categoryIds;

const checkCategoryIdsStructure = (categoryIds) => categoryIds.length >= 1 && typeof categoryIds === 'object';

const verifyNewBlogPostBody = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;

    if (!checkRequiredFields(title, content, categoryIds)) {
      return res.status(mapError('BAD_REQUEST')).json({ message: 'Some required fields are missing' });
    }

    if (!checkCategoryIdsStructure(categoryIds)) {
      return res.status(mapError('BAD_REQUEST')).json({ message: '"categoryIds" not found' });
    }

    const areCategoryIdsValid = await validateCategoryIds(categoryIds);
    if (!areCategoryIdsValid) {
      return res.status(mapError('BAD_REQUEST')).json({ message: '"categoryIds" not found' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyNewBlogPostBody,
};
