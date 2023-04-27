const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { blog_post: blogPosts, user } = require('../../src/database/models');
const {
  postUpdated,
} = require('../mocks');
const app = require('../../src/app');

const generateToken = (email) => sign(email);
const token = generateToken('lewishamilton');
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de delete post', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deleta um post com sucesso', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.onCall(0).resolves({ dataValues: postUpdated });
    stubFindPk.onCall(1).resolves(postUpdated);

    const stubDelete = sinon.stub(blogPosts, 'destroy');
    stubDelete.resolves(1);

    const stubFindOneUser = sinon.stub(user, 'findOne');
    stubFindOneUser.resolves(1);

    const httpResponse = await chai
      .request(app)
      .delete('/post/2')
      .set('Authorization', token);

    if (httpResponse.body.error) {
      console.log('****************************************');
      console.log('****************************************');
      console.log('ERRO NO DELETE', httpResponse.body.error);
      console.log('****************************************');
      console.log('****************************************');
    }

    expect(httpResponse).to.have.status(204);
  });
});
