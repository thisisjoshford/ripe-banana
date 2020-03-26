const { getStudio, getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {


  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studio')
      .send({
        name: 'Warner Bros.',
        address: {
          city: 'Hollywood',
          state: 'CA',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Warner Bros.',
          address: {
            city: 'Hollywood',
            state: 'CA',
            country: 'USA'
          },
          __v: 0
        });
      });
  });
});
