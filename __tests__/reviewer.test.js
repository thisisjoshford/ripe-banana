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
});
