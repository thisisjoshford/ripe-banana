const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select('name')
      .then(studios => res.send(studios))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send({
        _id: studio._id,
        name: studio.name
      }))
      .catch(next);
  })
