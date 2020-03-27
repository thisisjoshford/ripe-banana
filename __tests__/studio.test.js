const { getStudio, getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {


  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
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

  it('gets all the studios', async() => {
    const studios = await getStudios();
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        const studio = studios.reduce((acc, curr) => {
          acc.push({ _id: curr._id, name: curr.name });
          return acc;
        }, []);
        expect(res.body).toEqual(studio);
      });
  });

  it('gets a studio by id', async() => {
    const studio = await getStudio();
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          _id: studio._id, 
          name: studio.name 
        });
      });
  });
});
