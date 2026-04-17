const express = require('express');

const retweetsController = require('./repost-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  // semua route retweets diprefix /retweets
  app.use('/repost', route);

  route.post('/:tweetId', authMiddleware, retweetsController.repostTweet);

  route.delete('/:tweetId', authMiddleware, retweetsController.unrepostTweet);

  route.get('/:tweetId', retweetsController.getRepostsOfTweet);
};
