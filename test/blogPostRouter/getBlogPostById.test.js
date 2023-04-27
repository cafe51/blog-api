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

describe('Teste de get post by Id', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('retorna post por Id com sucesso', async () => {
    const stub = sinon.stub(blogPosts, 'findAll');
    stub.resolves(blogPostsMock[0]);

    const httpResponse = await chai
      .request(app)
      .get('/post/1')
      .set('Authorization', token);
    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal(blogPostsMock[0]);
  });
});
