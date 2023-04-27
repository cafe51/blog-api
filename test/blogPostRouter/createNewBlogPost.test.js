const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const {
  blog_post: blogPosts,
  posts_categories: postsCategories,
  category,
  user,
} = require('../../src/database/models');
const {
  createNewPostResponse,
  newBlogPost,
  newBlogPostWithoutTitle,
  newBlogPostWithoutContent,
  newBlogPostWithoutCategories,
  newBlogPostWithWrongCategoryIds,
  newBlogPostWithEmptyCategoryIds,
  newBlogPostWithFalseCategoryIds,
  newBlogPostWithFalseCategoryIds2,
  userMock,
} = require('../mocks');
const app = require('../../src/app');

const generateToken = (email) => sign(email);
const token = generateToken('MichaelSchumacher@gmail.com');
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de create new post', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('cria um novo post com sucesso', async () => {
    const stubfindByPk = sinon.stub(category, 'findByPk');
    stubfindByPk.onCall(0).resolves({
      id: 1,
      name: 'Inovação',
    });
    stubfindByPk.onCall(1).resolves({
      id: 2,
      name: 'Escola',
    });

    const stubFindUser = sinon.stub(user, 'findOne');
    stubFindUser.resolves({ dataValues: userMock });

    const stubCreatePost = sinon.stub(blogPosts, 'create');
    stubCreatePost.resolves(createNewPostResponse);

    const createPostCategories = sinon.stub(postsCategories, 'create');
    createPostCategories.resolves(null);

    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPost)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(201);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('id', createNewPostResponse.dataValues.id);
    expect(httpResponse.body).to.have.property('title', createNewPostResponse.dataValues.title);
    expect(httpResponse.body).to.have.property('content', createNewPostResponse.dataValues.content);
    expect(httpResponse.body).to.have.property('userId', createNewPostResponse.dataValues.user_id);
    expect(httpResponse.body).to.have.property('updated');
    expect(httpResponse.body).to.have.property('published');
  });
  it('retorna erro caso a categoryId inserida não corresponda a uma categoria no db', async () => {
    const stubfindByPk = sinon.stub(category, 'findByPk');
    stubfindByPk.resolves(false);

    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithFalseCategoryIds)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"categoryIds" not found');
  });
  it('retorna erro caso a categoryId inserida não corresponda a uma categoria no db', async () => {
    const stubfindByPk = sinon.stub(category, 'findByPk');
    stubfindByPk.onCall(0).resolves({
      id: 1,
      name: 'Inovação',
    });
    stubfindByPk.onCall(1).resolves(false);

    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithFalseCategoryIds2)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"categoryIds" not found');
  });
  it('retorna erro caso não seja passado o título', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithoutTitle)
      .set('Authorization', token);

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
  it('retorna erro caso o campo categoryIds seja uma string', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithWrongCategoryIds)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"categoryIds" not found');
  });
  it('retorna erro caso o campo categoryIds seja um array vazio', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/post')
      .send(newBlogPostWithEmptyCategoryIds)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"categoryIds" not found');
  });
});
