const express = require('express');
const tweetsController = require('./tweets-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  // semua route tweets diprefix /tweets
  app.use('/tweets', route);

  route.post('/', authMiddleware, tweetsController.createTweet);

  // cari tweets terbaru
  route.get('/search/recent', authMiddleware, tweetsController.getRecentTweets);

  // ambil tweets tertentu
  route.get('/:id', authMiddleware, tweetsController.getTweetByTweetId);

  // hapus tweets tertentu
  route.delete('/:id', authMiddleware, tweetsController.deleteTweetByTweetId);

  // ambil semua tweet punya user tertentu
  route.get(
    '/user/:id/tweets',
    authMiddleware,
    tweetsController.getTweetsByUserId
  );
};
