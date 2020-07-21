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
reviewerSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

reviewerSchema.statics.deleteReviewer = function(id) {
  return this.model('Review')
    .find({ reviewer: id })
    .then(reviews => {
      return reviews.length < 1 ? 
        this.findByIdAndDelete(id) 
        : function(){
          throw Error(
            'Sorry... you must delete your reviews first.'
          );
        }();
    });
};

module.exports = mongoose.model('Reviewer', reviewerSchema);
