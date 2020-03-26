const { getStudio, getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/books')
      .send({
        author: 'Warner Bros.',
        address: {
          city: 'Hollywood',
          State: 'CA',
          Country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          author: 'Warner Bros.',
          address: {
            city: 'Hollywood',
            State: 'CA',
            Country: 'USA'
          }
        });
      });
  });
});
