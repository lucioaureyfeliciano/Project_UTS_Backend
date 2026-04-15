const express = require('express');
const tweetsController = require('./tweets-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  // semua route tweets diprefix /tweets
  app.use('/tweets', route);

  route.post('/', authMiddleware, tweetsController.createTweet);
};
