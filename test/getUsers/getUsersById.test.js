const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { user } = require('../../src/database/models');

function generateToken(email) {
  return sign(email);
}

const { expect } = chai;

const app = require('../../src/app');

chai.use(chaiHttp);

describe('User API', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('retorna um usuário por id', async () => {
    const userMock = {
      id: 1,
      display_name: 'User1',
      email: 'user1@example.com',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
    };

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
