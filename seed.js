require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData({ studiosToCreate: 10 })
  .then(() => console.log('done'));
