const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { blog_post: blogPosts } = require('../../src/database/models');
// const { blogPostsMock } = require('../mocks');
const app = require('../../src/app');

const generateToken = (email) => sign(email);
const token = generateToken('test@example.com');
const { expect } = chai;
chai.use(chaiHttp);

const newBlogPost = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [1, 2],
};

const createNewPostResponse = {
  id: 3,
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  userId: 1,
  updated: '2022-05-18T18:00:01.196Z',
  published: '2022-05-18T18:00:01.196Z',
};

describe('Cria um post novo', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('cria um novo post com sucesso', async () => {
    const stub = sinon.stub(blogPosts, 'create');
    stub.resolves(createNewPostResponse);

    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPost)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(201);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal(createNewPostResponse);
  });
});
