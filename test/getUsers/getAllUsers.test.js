const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { user } = require('../../src/database/models');

function generateToken(email) {
  // Use um e-mail fictício para gerar um token de teste
  return sign(email);
}

const { expect } = chai;

const app = require('../../src/app');

chai.use(chaiHttp);

describe('User API', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('retorna todos os usuários', async () => {
    const users = [
      { id: 1, display_name: 'User1', email: 'user1@example.com' },
      { id: 2, display_name: 'User2', email: 'user2@example.com' },
    ];

    const token = generateToken('test@example.com');

    const userServiceStub = sinon.stub(user, 'findAll');
    userServiceStub.resolves(users);

    const res = await chai
      .request(app)
      .get('/user')
      .set('Authorization', token);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
    expect(res.body[0]).to.have.property('id', 1);
    expect(res.body[0]).to.have.property('display_name', 'User1');
    expect(res.body[0]).to.have.property('email', 'user1@example.com');
    expect(res.body[1]).to.have.property('id', 2);
    expect(res.body[1]).to.have.property('display_name', 'User2');
    expect(res.body[1]).to.have.property('email', 'user2@example.com');
  });
});
