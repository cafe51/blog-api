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

const postUpdated = {
  id: 3,
  title: 'Latest updates, August 1st',
  content: 'new update',
  user_id: 1,
  published: '2022-05-18T18:00:01.000Z',
  updated: '2022-05-18T18:07:32.000Z',
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
    {
      id: 2,
      name: 'Escola',
    },
  ],
};

const createNewPostResponse = {
  dataValues: {
    id: 3,
    title: 'Latest updates, August 1st',
    content: 'The whole text for the blog post goes here in this key',
    user_id: 2,
    updated: new Date().toISOString(),
    published: new Date().toISOString(),
  },
};

const newBlogPost = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [1, 2],
};

const newBlogPostWithoutTitle = {
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [1, 2],
};

const newBlogPostWithoutContent = {
  title: 'Latest updates, August 1st',
  categoryIds: [1, 2],
};

const newBlogPostWithoutCategories = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
};

const newBlogPostWithWrongCategoryIds = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: '[1, 2]',
};

const newBlogPostWithEmptyCategoryIds = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [],
};

const newBlogPostWithFalseCategoryIds = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [99],
};

const newBlogPostWithFalseCategoryIds2 = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [1, 99],
};

module.exports = {
  blogPostsMock,
  newBlogPost,
  postUpdated,
  createNewPostResponse,
  newBlogPostWithoutTitle,
  newBlogPostWithoutContent,
  newBlogPostWithoutCategories,
  newBlogPostWithWrongCategoryIds,
  newBlogPostWithEmptyCategoryIds,
  newBlogPostWithFalseCategoryIds,
  newBlogPostWithFalseCategoryIds2,
};
