const express = require('express');
const tweetsController = require('./tweets-controller');
const auth = require('../../../utils/auth');

const router = express.Router();

module.exports = (app) => {
  // semua route tweets diprefix /tweets
  app.use('/tweets', router);

  // CREATE tweet (harus login)
  router.post('/', auth, tweetsController.createTweet);
};
