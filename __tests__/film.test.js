const { getFilm, getFilms, getStudios } = require('../db/data-helpers');

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  it('creates a film', () => {
    return request(app)
      .post('/api/v1/film')
      .send({
        title: 'Weekend at Bernies',
        studio: new mongoose.Types.ObjectId(),
        released: 1997,
        cast: [{
          role: 'lead actor',
          actor: new mongoose.Types.ObjectId()
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Weekend at Bernies',
          studio: expect.any(String),
          released: 1997,
          cast: [{
            _id: expect.any(String),
            role: 'lead actor',
            actor: expect.any(String),
          }],
          __v: 0 
        });
      });
  });

  it('gets all the films', async() => {
    const films = await getFilms();
    const studios = await getStudios({
      _id: { $in: films.map(film => film.studio) }
    });
    
    return request(app)
      .get('/api/v1/film')
      .then(res => {
        // console.log(res.body);
        expect(res.body).toEqual(
          films.reduce((acc, curr) => {
            const studio = studios
              .find(studio => 
                studio._id === curr.studio);
            acc.push({ 
              _id: curr._id, 
              title: curr.title,
              released: curr.released,
              studio: { 
                _id: studio._id,
                name: studio.name
              }
            });
            return acc;
          }, []));
      });
  });


  it('gets a film by id', async() => {
    const film = await getFilm({}, {
      _id: true,
      title: true,
      released: true,
      reviews: true
    });
    // console.log(film);
    return request(app)
      .get(`/api/v1/film/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: expect.any(String),
          released: expect.any(Number),
          studio: {
            _id: expect.any(String),
            name: expect.any(String)
          },
          cast: [{
            _id: expect.any(String),
            role: expect.any(String),
            actor: {
              _id: expect.any(String),
              name: expect.any(String)
            },
          }],
          reviews:expect.any(Array)
        });
        res.body.reviews.forEach(review => {
          expect(review).toEqual({
            _id: expect.any(String),
            rating: expect.any(Number),
            review: expect.any(String),
            reviewer: {
              _id: expect.any(String),
              name: expect.any(String)
            }
          });
        });
      });
  });
});
