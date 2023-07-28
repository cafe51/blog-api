/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      display_name: 'Lewis Hamilton',
      email: 'lewishamilton@email.com',
      password: '123456789',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
    },
    {
      id: 2,
      display_name: 'Michael Schumacher',
      email: 'michaelSchumacher@email.com',
      password: '123456789',
      image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
    },
    {
      id: 3,
      display_name: 'Monkey D. Luffy',
      email: 'luffy@email.com',
      password: '123456789',
      image: 'https://wallpapers.com/images/hd/anime-pictures-bj226rrdwe326upu.jpg',
    },
    {
      id: 4,
      display_name: 'Anthony Kiedis',
      email: 'tony_flow.email.com',
      password: '123456789',
      image: 'https://media.gettyimages.com/id/688548156/pt/foto/red-hot-chili-peppers-anthony-kiedis-torhout-werchter-festival-torhout-belgium.jpg?s=612x612&w=gi&k=20&c=VtLlAtC6XJJloMPUPwsIvx80NIpYziUH18WAPpv0NGQ=',
    },
    {
      id: 5,
      display_name: 'Fernando Pessoa',
      email: 'nando_person@email.com',
      password: '123456789',
      image: 'https://www.portaldaliteratura.com/assets/files_autores/339.webp',
    },
    {
      id: 6,
      display_name: 'Japhé Nogueira',
      email: 'cafecafe51@hotmail.com',
      password: '123456789',
      image: 'https://japhe.vercel.app/images/ProfileImageSite2.png',
    },
    {
      id: 7,
      display_name: 'Princess Zelda',
      email: 'zelda@email.com',
      password: '123456789',
      image: 'https://www.svg.com/img/gallery/the-stunning-transformation-of-princess-zelda/intro-1614026089.jpg',
    },
    {
      id: 8,
      display_name: 'Visitante',
      email: 'visitante@email.com',
      password: '123456',
      image: 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360',
    },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
