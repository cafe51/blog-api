const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { user } = require('../../src/database/models');

function generateToken(insertUser) {
  return sign(insertUser);
}

const { expect } = chai;

const app = require('../../src/app');

chai.use(chaiHttp);

const newUser = {
  displayName: 'newUserdaSilva',
  email: 'new_user@email.com',
  password: '123456',
  image: 'image.jpg',
};

const newUser2 = {
  display_name: 'newUserdaSilva',
  email: 'new_user@email.com',
  password: '123456',
  image: 'image.jpg',
};

describe('Testa o cadastro de novo usuário', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('cadastra um novo usuário', async () => {
    const userServiceStub = sinon.stub(user, 'findOrCreate');
    userServiceStub.resolves([newUser2, true]);

    const token = generateToken(newUser2);

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUser);
    expect(httpResponse).to.have.status(201);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('token', token);
  });
  it('cadastra um novo usuário que já existe', async () => {
    const userServiceStub = sinon.stub(user, 'findOrCreate');
    userServiceStub.resolves([newUser2, false]);

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUser);

    expect(httpResponse).to.have.status(409);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', 'User already registered');
  });
  it('cadastra um novo usuário com o nome errado', async () => {
    const newUserWithInvalidName = {
      displayName: 'A',
      email: 'new_user@email.com',
      password: '123456',
      image: 'image.jpg',
    };

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUserWithInvalidName);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"displayName" length must be at least 8 characters long');
  });
  it('cadastra um novo usuário sem inserir o nome', async () => {
    const newUserWithoutName = {
      email: 'new_user@email.com',
      password: '123456',
      image: 'image.jpg',
    };

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUserWithoutName);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"displayName" is required');
  });
  it('cadastra um novo usuário com o email errado', async () => {
    const newUserWithInvalidEmail = {
      displayName: 'newUserdaSilva',
      email: 'invalidEmail',
      password: '123456',
      image: 'image.jpg',
    };

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUserWithInvalidEmail);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"email" must be a valid email');
  });
  it('cadastra um novo usuário sem inserir o email', async () => {
    const newUserWithoutEmail = {
      displayName: 'newUserdaSilva',
      password: '123456',
      image: 'image.jpg',
    };

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUserWithoutEmail);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"email" is required');
  });
  it('cadastra um novo usuário com a senha errada', async () => {
    const userServiceStub = sinon.stub(user, 'findOrCreate');
    userServiceStub.resolves('registrado');

    const newUserWithInvalidPassword = {
      displayName: 'newUserdaSilva',
      email: 'new_user@email.com',
      password: '123',
      image: 'image.jpg',
    };

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUserWithInvalidPassword);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"password" length must be at least 6 characters long');
  });
  it('cadastra um novo usuário sem inserir a senha', async () => {
    const newUserWithoutPassword = {
      displayName: 'newUserdaSilva',
      email: 'new_user@email.com',
      image: 'image.jpg',
    };

    const httpResponse = await chai
      .request(app)
      .post('/user')
      .send(newUserWithoutPassword);
    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.have.property('message', '"password" is required');
  });
});
