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
    });
    // console.log(reviewer);
    return request(app)
      .get(`/api/v1/reviewer/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews: expect.any(Array),
        });
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewer/${reviewer._id}`)
      .send({ name: 'Roger Ebert' })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          ...reviewer,
          name: 'Roger Ebert'
        });
      });
  });

  it('throws error if trying to delete a reviewer w/ reviews', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .delete(`/api/v1/reviewer/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          'message': 'Sorry... you must delete your reviews first.',
          'status': 500,     
        });
      });
  });

});
