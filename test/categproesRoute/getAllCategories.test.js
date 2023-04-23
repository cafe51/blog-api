const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { category } = require('../../src/database/models');

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

  it('retorna todos os usuários', async () => {
    const categories = [
      { id: 1, name: 'Inovação' },
      { id: 2, name: 'Escola' },
      { id: 3, name: 'Entretenimento' },
    ];

    const token = generateToken('test@example.com');

    const stub = sinon.stub(category, 'findAll');
    stub.resolves(categories);

    const httpResponse = await chai
      .request(app)
      .get('/categories')
      .set('Authorization', token);

    console.log('Resposta de /categories', httpResponse.body);
    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body.length).to.equal(3);
    expect(httpResponse.body[0]).to.have.property('id', 1);
    expect(httpResponse.body[0]).to.have.property('name', 'Inovação');
    expect(httpResponse.body[1]).to.have.property('id', 2);
    expect(httpResponse.body[1]).to.have.property('name', 'Escola');
    expect(httpResponse.body[2]).to.have.property('id', 3);
    expect(httpResponse.body[2]).to.have.property('name', 'Entretenimento');
  });
});
