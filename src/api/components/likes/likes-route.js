const express = require('express');
const likesController = require('./likes-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/likes', route);

  // Like tweet
  route.post('/:tweetId', authMiddleware, likesController.likeTweet);

  // Unlike tweet
  route.delete('/:tweetId', authMiddleware, likesController.unlikeTweet);

  // Get users who liked a tweet
  route.get('/tweets/:tweetId', likesController.getUsersWhoLiked);

  // Get tweets liked by user
  route.get('/users/:userId', likesController.getLikedTweetsByUser);
};
