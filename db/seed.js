const Book = require('../models/Book');
const chance = require('chance').Chance();

// specifying the number of tweets to create with our seed function
module.exports = async({ booksToCreate = 100 } = {}) => {
  // creating tweets
  // creating an array of tweetsToCreate length
  // map through the array
  // -> for each item in the array we create an object with { handle, text }
  // for each tweet in the mapped array we create a tweet in our mongodb
  const genre = ['fiction', 'non-fiction'];
  const books = await Book.create([...Array(booksToCreate)].map(() => ({
    author: chance.name(),
    title: chance.animal() + ' ' + chance.word(),
    genre: chance.pickone(genre)
  })));

  // await Comment.create([...Array(commentsToCreate)].map(() => ({
  //   tweetId: chance.pickone(tweets)._id,
  //   handle: chance.pickone(handles),
  //   text: chance.sentence()
  // })));
};
