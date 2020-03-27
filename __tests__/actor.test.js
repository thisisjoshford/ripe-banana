const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {


  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Mr. Bean',
        dob: new Date(),
        pob: 'Milwaukee, WI'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mr. Bean',
          dob: expect.any(Date),
          pob: 'Milwaukee, WI',
          __v: 0
        });
      });
  });
});
