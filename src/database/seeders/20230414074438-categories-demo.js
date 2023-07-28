/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      id: 1,
      name: 'Inovação',
    },
    {
      id: 2,
      name: 'Escola',
    },
    {
      id: 3,
      name: 'F1',
    },
    {
      id: 4,
      name: 'dedicação',
    },
    {
      id: 5,
      name: 'solidariedade',
    },
    {
      id: 6,
      name: 'caridade',
    },
    {
      id: 7,
      name: 'comunidades',
    },
    {
      id: 8,
      name: 'dedicação',
    },
    {
      id: 9,
      name: 'exercício',
    },
    {
      id: 10,
      name: 'saúde',
    },
    {
      id: 11,
      name: 'determinação',
    },
    {
      id: 12,
      name: 'diversidade',
    },
    {
      id: 13,
      name: 'igualdade',
    },
    {
      id: 14,
      name: 'união',
    },
    {
      id: 15,
      name: 'arte',
    },
    {
      id: 16,
      name: 'música',
    },
    {
      id: 17,
      name: 'jazz',
    },
    {
      id: 18,
      name: 'Aventura',
    },
    {
      id: 19,
      name: 'Amizade',
    },
    {
      id: 20,
      name: 'Sonhos',
    },
    {
      id: 21,
      name: 'Música',
    },
    {
      id: 22,
      name: 'Natureza',
    },
    {
      id: 23,
      name: 'Poesia',
    },
    {
      id: 24,
      name: 'Tecnologia',
    },
    {
      id: 25,
      name: 'Programação',
    },
    {
      id: 26,
      name: 'Design de Software',
    },
    {
      id: 27,
      name: 'Coragem',
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
