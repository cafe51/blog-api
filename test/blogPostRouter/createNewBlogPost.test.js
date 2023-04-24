const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { blog_post: blogPosts } = require('../../src/database/models');
const app = require('../../src/app');

const generateToken = (email) => sign(email);
const token = generateToken('MichaelSchumacher@gmail.com');
const { expect } = chai;
chai.use(chaiHttp);

const newBlogPost = {
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [1, 2],
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
});
