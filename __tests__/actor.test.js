const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {


  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actor')
      .send({
        name: 'Mr. Bean',
        dob: '02/19/1982',
        pob: 'Milwaukee, WI'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mr. Bean',
          dob: expect.any(String),
          pob: 'Milwaukee, WI',
          __v: 0
        });
      });
  });

  it('gets all the actors', async() => {
    const actors = await getActors();
    return request(app)
      .get('/api/v1/actor')
      .then(res => {
        expect(res.body).toEqual(
          actors.reduce((acc, curr) => {
            acc.push({ 
              _id: curr._id, 
              name: curr.name 
            });
            return acc;
          }, []));
      });
  });

  it('gets an actor by id', async() => {
    const actor = await getActor();
    return request(app)
      .get(`/api/v1/actor/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          _id: actor._id, 
          name: actor.name 
        });
      });
  });
});
