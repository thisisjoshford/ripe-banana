const { Router } = require('express');
const Review = require('../models/review');

module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Review
      .getTopReviews()
      .then(reviews => res.send(reviews))
      .catch(next);
  });


  
