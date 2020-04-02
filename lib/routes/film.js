const { Router } = require('express');
const Film = require('../models/film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      //find the studio key and populate it w/name
      .populate({ path: 'studio', select: 'name' })
      .select('title released studio')
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate({ path: 'studio', select: 'name' })      
      .populate({ 
        path: 'reviews', 
        select: 'rating review reviewer -film', 
        populate: {
          path: 'reviewer',
          select: 'name' }
      })
      .populate({ path: 'cast.actor', select: 'name' })
      .select('title released cast reviews')
      .then(film => {
        console.log(film);
        res.send(film);
      })
      .catch(next);
  });

  

