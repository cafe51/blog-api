const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { blog_post: blogPosts } = require('../../src/database/models');
const {
  createNewPostResponse,
  newBlogPost,
  newBlogPostWithoutTitle,
  newBlogPostWithoutContent,
  newBlogPostWithoutCategories,
} = require('../mocks');
const app = require('../../src/app');

const generateToken = (email) => sign(email);
const token = generateToken('MichaelSchumacher@gmail.com');
const { expect } = chai;
chai.use(chaiHttp);

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

    console.log('RESPOSTA ', httpResponse.body);
    expect(httpResponse).to.have.status(201);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('id', createNewPostResponse.dataValues.id);
    expect(httpResponse.body).to.have.property('title', createNewPostResponse.dataValues.title);
    expect(httpResponse.body).to.have.property('content', createNewPostResponse.dataValues.content);
    expect(httpResponse.body).to.have.property('userId', createNewPostResponse.dataValues.user_id);
    expect(httpResponse.body).to.have.property('updated');
    expect(httpResponse.body).to.have.property('published');
  });
  it('retorna erro caso não seja passado o título', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithoutTitle)
      .set('Authorization', token);

    console.log('RESPOSTA SEM O TITULO', httpResponse.body);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', 'Some required fields are missing');
  });
  it('retorna erro caso não seja passado o content', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithoutContent)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', 'Some required fields are missing');
  });
  it('retorna erro caso não seja passada as categorias', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithoutCategories)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', 'Some required fields are missing');
  });
});
