const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]  
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

filmSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'film'
});

module.exports = mongoose.model('Film', filmSchema);
