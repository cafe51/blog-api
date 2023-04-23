const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { category } = require('../../src/database/models');
const app = require('../../src/app');

chai.use(chaiHttp);
const { expect } = chai;
const generateToken = (email) => sign(email);
const token = generateToken('new_user@email.com');
const newCategory = { name: 'Typescript' };
const newCategoryCreateResponse = [{ id: 4, name: 'Typescript' }, true];
const categoryAlreadyExists = [{ id: 4, name: 'Typescript' }, false];

describe('User API', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('cadastra uma nova categoria', async () => {
    const stub = sinon.stub(category, 'findOrCreate');
    stub.resolves(newCategoryCreateResponse);

    const httpResponse = await chai
      .request(app)
      .post('/categories')
      .send(newCategory)
      .set('Authorization', token);
    expect(httpResponse).to.have.status(201);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('id', 4);
    expect(httpResponse.body).to.have.property('name', 'Typescript');
  });
  it('cadastra uma categoria que já existe', async () => {
    const stub = sinon.stub(category, 'findOrCreate');
    stub.resolves(categoryAlreadyExists);

    const httpResponse = await chai
      .request(app)
      .post('/categories')
      .send(newCategory)
      .set('Authorization', token);
    expect(httpResponse).to.have.status(409);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', 'Category already registered');
  });
  it('cadastra uma categoria sem o nome', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/categories')
      .set('Authorization', token);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"name" is required');
  });
});
