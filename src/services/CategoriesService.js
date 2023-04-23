const { category } = require('../database/models');
// const errorMap = require('../utils/errorMap');

class CategoriesService {
  constructor() {
    this.model = category;
  }

  async getAllcategories() {
    const categories = await this.model.findAll();
    return { status: null, payload: categories };
  }
}

module.exports = CategoriesService;
