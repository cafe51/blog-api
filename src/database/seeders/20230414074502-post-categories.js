/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts_categories', [{
      post_id: 1,
      category_id: 1,
    },
    {
      post_id: 2,
      category_id: 2,
    },
    {
      post_id: 3,
      category_id: 2,
    },
    {
      post_id: 4,
      category_id: 2,
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts_categories', null, {});
  },
};
