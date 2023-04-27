const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { user } = require('../../src/database/models');
const { userMock } = require('../mocks');

function generateToken(email) {
  return sign(email);
}

const { expect } = chai;

const app = require('../../src/app');

chai.use(chaiHttp);

describe('Teste de get user by Id', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('retorna um usuário por id com sucesso', async () => {
    const token = generateToken('test@example.com');

    const stub = sinon.stub(user, 'findByPk');
    stub.resolves(userMock);

    const httpResponse = await chai
      .request(app)
      .get('/user/1')
      .set('Authorization', token);
    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('id', 1);
    expect(httpResponse.body).to.have.property('display_name', 'User1');
    expect(httpResponse.body).to.have.property('email', 'user1@example.com');
  });
  it('retorna uma mensagem de erro caso o usuário não exista no banco', async () => {
    const token = generateToken('test@example.com');

    const stub = sinon.stub(user, 'findByPk');
    stub.resolves('');

    const httpResponse = await chai
      .request(app)
      .get('/user/1')
      .set('Authorization', token);
    expect(httpResponse).to.have.status(404);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', 'User does not exist');
  });
});
