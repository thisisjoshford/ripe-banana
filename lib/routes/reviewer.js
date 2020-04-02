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
      .populate({
        path: 'reviews',
        select: 'rating review film -reviewer',
        populate: {
          path: 'film',
          select: 'title'
        }})
      .select('name company reviews')
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Reviewer
      .deleteReviewer(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
  
