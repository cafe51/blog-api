/* eslint-disable no-undef */
const chaiHttp = require('chai-http');
const chai = require('chai');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../src/app');

describe('GET básico', () => {
  it('retorna "ok" e status 200', async () => {
    const httpResponse = await chai
      .request(app)
      .get('/');
    expect(httpResponse.status).to.equal(200);
  });
});
