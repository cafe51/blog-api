/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('blog_posts', [{
      id: 1,
      title: 'Post do Ano',
      content: 'Melhor post do ano',
      user_id: 1,
      published: new Date('2011-08-01T19:58:00.000Z'),
      updated: new Date('2011-08-01T19:58:51.000Z'),
    },
    {
      id: 2,
      title: 'Vamos que vamos',
      content: 'Foguete não tem ré',
      user_id: 1,
      published: new Date('2011-08-01T19:58:00.000Z'),
      updated: new Date('2011-08-01T19:58:51.000Z'),
    },
    {
      id: 3,
      title: 'teste1',
      content: 'testetstestetestestetst',
      user_id: 2,
      published: new Date('2011-09-01T19:58:00.000Z'),
      updated: new Date('2011-08-01T19:58:51.000Z'),
    },
    {
      id: 4,
      title: 'testet aaaaaaqqq testetstestetestestetst testetstestetestestetst',
      content: 'Foguete não tem ré',
      user_id: 2,
      published: new Date('2012-08-01T19:58:00.000Z'),
      updated: new Date('2011-08-01T19:58:51.000Z'),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blog_posts', null, {});
  },
};
