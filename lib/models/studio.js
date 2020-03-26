const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
    },
    state: {
      state: String,
    },
    country: {
      type: String,
    }
}
});


module.exports = mongoose.model('Studio', studioSchema);