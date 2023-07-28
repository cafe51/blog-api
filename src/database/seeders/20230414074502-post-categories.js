/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts_categories', [{
      post_id: 1,
      category_id: 3,
    },
    {
      post_id: 1,
      category_id: 4,
    },
    /// //////////////////////////////////////
    {
      post_id: 2,
      category_id: 5,
    },
    {
      post_id: 2,
      category_id: 6,
    },
    {
      post_id: 2,
      category_id: 7,
    },
    /// //////////////////////////////////////
    {
      post_id: 3,
      category_id: 9,
    },
    {
      post_id: 3,
      category_id: 10,
    },
    {
      post_id: 3,
      category_id: 11,
    },
    /// //////////////////////////////////////
    {
      post_id: 4,
      category_id: 12,
    },
    {
      post_id: 4,
      category_id: 13,
    },
    {
      post_id: 4,
      category_id: 14,
    },
    /// //////////////////////////////////////
    {
      post_id: 5,
      category_id: 15,
    },
    {
      post_id: 5,
      category_id: 16,
    },
    {
      post_id: 5,
      category_id: 17,
    },
    /// //////////////////////////////////////
    {
      post_id: 6,
      category_id: 3, // F1
    },
    {
      post_id: 6,
      category_id: 4, // dedicação
    },
    /// //////////////////////////////////////
    {
      post_id: 7,
      category_id: 3, // F1
    },
    {
      post_id: 7,
      category_id: 1, // Inovação
    },
    /// //////////////////////////////////////
    {
      post_id: 8,
      category_id: 4, // dedicação
    },
    {
      post_id: 8,
      category_id: 14, // união
    },
    /// //////////////////////////////////////
    {
      post_id: 9,
      category_id: 11, // determinação
    },
    /// //////////////////////////////////////
    {
      post_id: 10,
      category_id: 13, // igualdade
    },
    {
      post_id: 10,
      category_id: 14, // união
    },
    /// //////////////////////////////////////
    {
      post_id: 11,
      category_id: 18, // Aventura
    },
    /// //////////////////////////////////////
    {
      post_id: 12,
      category_id: 19, // Amizade
    },
    /// //////////////////////////////////////
    {
      post_id: 13,
      category_id: 20, // Sonhos
    },
    /// //////////////////////////////////////
    {
      post_id: 14,
      category_id: 21, // Música
    },
    /// //////////////////////////////////////
    {
      post_id: 15,
      category_id: 22, // Natureza
    },
    /// //////////////////////////////////////
    {
      post_id: 16,
      category_id: 23, // Poesia
    },
    /// //////////////////////////////////////
    {
      post_id: 17,
      category_id: 23, // Poesia
    },
    /// //////////////////////////////////////
    {
      post_id: 18,
      category_id: 23, // Poesia
    },
    /// //////////////////////////////////////
    {
      post_id: 19,
      category_id: 23, // Poesia
    },
    /// //////////////////////////////////////
    {
      post_id: 20,
      category_id: 24, // Tecnologia
    },
    {
      post_id: 20,
      category_id: 25, // Programação
    },
    /// //////////////////////////////////////
    {
      post_id: 21,
      category_id: 24, // Tecnologia
    },
    {
      post_id: 21,
      category_id: 25, // Programação
    },
    /// //////////////////////////////////////
    {
      post_id: 22,
      category_id: 24, // Tecnologia
    },
    {
      post_id: 22,
      category_id: 26, // Design de Software
    },
    /// //////////////////////////////////////
    {
      post_id: 23,
      category_id: 18, // Aventura
    },
    {
      post_id: 23,
      category_id: 19, // Amizade
    },
    /// //////////////////////////////////////
    {
      post_id: 24,
      category_id: 27, // Coragem
    },
    {
      post_id: 24,
      category_id: 18, // Aventura
    },
    /// //////////////////////////////////////
    {
      post_id: 25,
      category_id: 19, // Amizade
    },
    {
      post_id: 25,
      category_id: 18, // Aventura
    },
    /// //////////////////////////////////////
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts_categories', null, {});
  },
};
