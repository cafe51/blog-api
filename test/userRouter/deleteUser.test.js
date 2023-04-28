const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { user } = require('../../src/database/models');
const {
  userFound,
} = require('../mocks');
const app = require('../../src/app');

const generateToken = (insertUser) => sign(insertUser);
const token = generateToken(userFound);
const { expect } = chai;
chai.use(chaiHttp);

describe('Teste de delete de usuário', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Usuário consegue deletar a própria conta', async () => {
    const stubDelete = sinon.stub(user, 'destroy');
    stubDelete.resolves(1);

    const httpResponse = await chai
      .request(app)
      .delete('/user/me')
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
});
