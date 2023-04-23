const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../src/app');
const { user } = require('../../src/database/models');

describe('Testa o login', () => {
  afterEach(() => sinon.restore());
  it('retorna o token quando um email e um password valido são inseridos', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const userMock = {
      dataValues: {
        email,
        password,
      },
    };
    sinon.stub(user, 'findOne').resolves(userMock);
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email, password });
    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('token');
  });
  it('retorna um erro quando o email ou o password estão incorretos', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';

    sinon.stub(user, 'findOne').resolves(null);

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email, password });

    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message', 'Invalid fields');
  });
  it('retorna um erro quando o password não é inserido', async () => {
    const email = 'test@example.com';

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email });

    expect(res).to.have.status(500);
  });
  it('retorna um erro quando o password não é inserido', async () => {
    const password = '123456';

    const res = await chai
      .request(app)
      .post('/login')
      .send({ password });

    expect(res).to.have.status(500);
  });
});
