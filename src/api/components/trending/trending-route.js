const express = require('express');

const trendingController = require('./trending-controller');

const route = express.Router();

module.exports = (app) => {
  // prefix /trending
  app.use('/trending', route);

  // Get trending hashtags based on tweet text
  route.get('/', trendingController.getTrending);
};
