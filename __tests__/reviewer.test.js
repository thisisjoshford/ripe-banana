const { getReviewer, getReviewers } = require('../db/data-helpers');

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewer')
      .send({
        name: 'Jay Sherman',
        company: 'Coming Attractions'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Jay Sherman',
          company: 'Coming Attractions',
          __v: 0 
        });
      });
  });  

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer({}, {
      _id: true,
      name: true,
      company: true,
      reviews: true
    });
    // console.log(reviewer);
    return request(app)
      .get(`/api/v1/reviewer/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          __v: 0
        });
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer({}, {
      _id: true,
      name: true,
      company: true,
      reviews: true
    });

    return request(app)
      .patch(`/api/v1/reviewer/${reviewer._id}`)
      .send({ name: 'Roger Ebert' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          name: 'Roger Ebert', 
          reviews: [{
            _id: expect.any(String),
            rating: expect.any(Number),
            review: expect.any(String),
            film: {
              _id: expect.any(String),
              title: expect.any(String)
            }
          }],
          __v: 0
        });
      });
  });
});
