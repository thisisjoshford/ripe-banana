const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  it('creates a film', () => {
    return request(app)
      .post('/api/v1/film')
      .send({
        title: 'Weekend at Bernies',
        studio: 'Warner Bros. Studios',
        released: 1997,
        cast: [{
          role: 'lead actor',
          actor: 'Andrew McCarthy'
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Weekend at Bernies',
          studio: 'Warner Bros. Studios',
          released: 1997,
          cast: [{
            role: 'lead actor',
            actor: 'Andrew McCarthy'
          }],
          __v: 0
        });
      });
  });
});
