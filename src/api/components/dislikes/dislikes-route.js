const express = require('express');
const dislikesController = require('./dislikes-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/dislikes', route);

  // Dislike tweet
  route.post('/:tweetId', authMiddleware, dislikesController.dislikeTweet);

  // Remove dislike from tweet
  route.delete('/:tweetId', authMiddleware, dislikesController.undislikeTweet);

  // Get users who disliked a tweet
  route.get(
    '/tweets/:tweetId',
    authMiddleware,
    dislikesController.getUsersWhoDisliked
  );

  // Get tweets disliked by user
  route.get(
    '/users/:userId',
    authMiddleware,
    dislikesController.getDislikedTweetsByUser
  );
};
