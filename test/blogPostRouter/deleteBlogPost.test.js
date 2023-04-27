const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { blog_post: blogPosts } = require('../../src/database/models');
const {
  postUpdated,
  postUpdated2,
  userFound,
} = require('../mocks');
const app = require('../../src/app');

const generateToken = (insertUser) => sign(insertUser);
const token = generateToken(userFound);
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de delete post', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deleta um post com sucesso', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.resolves({ dataValues: postUpdated });

    const stubDelete = sinon.stub(blogPosts, 'destroy');
    stubDelete.resolves(1);

    const httpResponse = await chai
      .request(app)
      .delete('/post/3')
      .set('Authorization', token);

    if (httpResponse.status !== 204) {
      console.log('****************************************');
      console.log('****************************************');
      console.log('ERRO NO DELETE', httpResponse.body);
      console.log('****************************************');
      console.log('****************************************');
    }

    expect(httpResponse).to.have.status(204);
  });
  it('falha ao tentar deletar um post sem autorização', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.resolves({ dataValues: postUpdated2 });

    const httpResponse = await chai
      .request(app)
      .delete('/post/3')
      .set('Authorization', token);

    expect(httpResponse).to.have.status(401);
    expect(httpResponse.body).to.have.property('message', 'Unauthorized user');
  });

  it('falha ao tentar deletar um post que não existe', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.resolves(null);

    const httpResponse = await chai
      .request(app)
      .delete('/post/99')
      .set('Authorization', token);

    expect(httpResponse).to.have.status(404);
    expect(httpResponse.body).to.have.property('message', 'Post does not exist');
  });
});
