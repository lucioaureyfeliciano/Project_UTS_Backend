const express = require('express');

const followsController = require('./follows-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/follows', route);

  // follow user
  route.post('/:userId', authMiddleware, followsController.followUser);

  // unfollow user
  route.delete('/:userId', authMiddleware, followsController.unfollowUser);

  // get followers
  route.get('/:userId', followsController.getFollowers);
};
