const { getReview, getReviews} = require('../db/data-helpers');

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  it('creates a review', () => {
    return request(app)
      .post('/api/v1/review')
      .send({
        rating: 4,
        reviewer: new mongoose.Types.ObjectId(),
        review: 'Best Movie Ever!',
        film: new mongoose.Types.ObjectId()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 4,
          reviewer: expect.any(String),
          review: 'Best Movie Ever!',
          film: expect.any(String),
          __v: 0 
        });
      });
  });  
});
