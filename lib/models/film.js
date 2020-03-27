const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  released: {
    type: Number,
    min: 1000,
    max: 9999
  },
  cast: [{
    role: {
      type: String,
    },
    actor: {
      type: mongoose.Types.ObjectId,
      required: true
    }
  }]
});

module.exports = mongoose.model('Film', filmSchema);
