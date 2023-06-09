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

const generateToken = (email) => sign(email);
const token = generateToken(userFound);
const { expect } = chai;
chai.use(chaiHttp);

const blogPostUpdate = {
  title: 'Latest updates, August 1st',
  content: 'new update',
};

const blogPostUpdateWithoutTitle = {
  content: 'new update',
};

const blogPostUpdateWithoutContent = {
  title: 'Latest updates, August 1st',
};

describe('Teste de atualização de post', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Atualiza um novo post com sucesso', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.onCall(0).resolves({ dataValues: postUpdated });
    stubFindPk.onCall(1).resolves(postUpdated);

    const stubUpdate = sinon.stub(blogPosts, 'update');
    stubUpdate.resolves(postUpdated);

    const httpResponse = await chai
      .request(app)
      .put('/post/2')
      .send(blogPostUpdate)
      .set('Authorization', token);

    if (httpResponse.body.error) {
      console.log('****************************************');
      console.log('****************************************');
      console.log('ERRO NO UPDATE', httpResponse.body.error);
      console.log('****************************************');
      console.log('****************************************');
    }
    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal(postUpdated);
  });
  it('É impedido de atualizar um post por não ser o dono do post', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.resolves({ dataValues: postUpdated2 });

    const stubUpdate = sinon.stub(blogPosts, 'update');
    stubUpdate.resolves(postUpdated2);

    const httpResponse = await chai
      .request(app)
      .put('/post/3')
      .send(blogPostUpdate)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(401);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal({ message: 'Unauthorized user' });
  });
  it('É impedido de atualizar um post que não existe', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.resolves(null);

    const httpResponse = await chai
      .request(app)
      .put('/post/9999')
      .send(blogPostUpdate)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(404);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal({ message: 'Post does not exist' });
  });
  it('É impedido de atualizar um post sem o informar o título', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.resolves({ dataValues: postUpdated });

    const httpResponse = await chai
      .request(app)
      .put('/post/2')
      .send(blogPostUpdateWithoutTitle)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal({ message: 'Some required fields are missing' });
  });
  it('É impedido de atualizar um post sem o informar o título', async () => {
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.resolves({ dataValues: postUpdated });

    const httpResponse = await chai
      .request(app)
      .put('/post/2')
      .send(blogPostUpdateWithoutContent)
      .set('Authorization', token);

    expect(httpResponse).to.have.status(400);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal({ message: 'Some required fields are missing' });
  });
});
