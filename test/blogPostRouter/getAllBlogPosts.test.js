const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { blog_post: blogPosts } = require('../../src/database/models');
const { blogPostsMock } = require('../mocks');
const app = require('../../src/app');

const generateToken = (email) => sign(email);
const token = generateToken('test@example.com');
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de get all post', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('retorna todos os posts com sucessos', async () => {
    const stub = sinon.stub(blogPosts, 'findAll');
    stub.resolves(blogPostsMock);

    const httpResponse = await chai
      .request(app)
      .get('/post')
      .set('Authorization', token);

    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body.length).to.equal(3);
    expect(httpResponse.body).to.be.deep.equal(blogPostsMock);
  });
});
