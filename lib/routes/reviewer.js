const { Router } = require('express');
const Reviewer = require('../models/reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
