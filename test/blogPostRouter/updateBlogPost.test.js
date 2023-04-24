const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { sign } = require('../../src/utils/jwt');
const { blog_post: blogPosts, user } = require('../../src/database/models');
const {
  postUpdated,
  blogPostsMock,
} = require('../mocks');
const app = require('../../src/app');

const generateToken = (email) => sign(email);
const token = generateToken('lewishamilton');
const { expect } = chai;
chai.use(chaiHttp);

const blogPostUpdate = {
  title: 'Latest updates, August 1st',
  content: 'new update',
};

const userFound = {
  dataValues: {
    id: 1,
    displayName: 'Lewis Hamilton',
    email: 'lewishamilton@gmail.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
  },
};

describe('Atualiza um post', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Atualiza um novo post com sucesso', async () => {
    // const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    // stubFindPk.resolves({ dataValues: blogPostsMock[3] });
    const stubFindPk = sinon.stub(blogPosts, 'findByPk');
    stubFindPk.onCall(0).resolves({ dataValues: postUpdated });
    stubFindPk.onCall(1).resolves(postUpdated);

    const stubUpdate = sinon.stub(blogPosts, 'update');
    stubUpdate.resolves(blogPostsMock[3]);

    const stubFindOneUser = sinon.stub(user, 'findOne');
    stubFindOneUser.resolves(userFound);

    const httpResponse = await chai
      .request(app)
      .put('/post/3')
      .send(blogPostUpdate)
      .set('Authorization', token);
    console.log(httpResponse.body);
    expect(httpResponse).to.have.status(200);
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.be.deep.equal(postUpdated);
  });
});
