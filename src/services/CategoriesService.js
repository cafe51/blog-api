const { category } = require('../database/models');
const errorMap = require('../utils/errorMap');

class CategoriesService {
  constructor() {
    this.model = category;
  }

  async getAllcategories() {
    const categories = await this.model.findAll();
    return { status: null, payload: categories };
  }

  async createNewCategory({ name }) {
    if (!name) return { status: errorMap.mapError('BAD_REQUEST'), payload: '"name" is required' };
    const [newCategory, created] = await this.model.findOrCreate({ where: { name } });

    if (!created) {
      return { status: errorMap.mapError('CONFLICT'), payload: 'Category already registered' };
    }

    return { status: null, payload: newCategory };
  }
}

module.exports = CategoriesService;
