const blogPostsMock = [
  {
    id: 1,
    title: 'Post do Ano',
    content: 'Melhor post do ano',
    userId: 1,
    published: '2011-01-01T19:57:00.000Z',
    updated: '2016-02-01T19:51:52.000Z',
    user: {
      id: 1,
      displayName: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
    },
    categories: [
      {
        id: 1,
        name: 'Inovação',
      },
    ],
  },
  {
    id: 2,
    title: 'Post de Natal',
    content: 'Feliz Natal',
    userId: 1,
    published: '2012-05-01T19:51:00.000Z',
    updated: '2013-07-01T19:54:58.000Z',
    user: {
      id: 2,
      displayName: 'Fulano de Tal',
      email: 'lewishamilton@gmail.com',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/22/Fulano_de_tal_2016_Malaysia_3.jpg',
    },
    categories: [
      {
        id: 2,
        name: 'Saúde',
      },
    ],
  },
  {
    id: 3,
    title: 'Post do Páscoa',
    content: 'Feliz Páscoa',
    userId: 1,
    published: '2022-04-01T19:45:00.000Z',
    updated: '2023-01-01T19:28:51.000Z',
    user: {
      id: 3,
      displayName: 'Ribaldo Silva',
      email: 'ribaldosilva@gmail.com',
      image: null,
    },
    categories: [
      {
        id: 3,
        name: 'Entretenimento',
      },
    ],
  },
];

module.exports = {
  blogPostsMock,
};
