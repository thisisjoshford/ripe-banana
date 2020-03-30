const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});
reviewerSchema.virtual('Reviews', {
  ref: 'Reviews',
  localField: '_id',
  foreignField: 'reviewer'
});

module.exports = mongoose.model('Reviewer', reviewerSchema);
