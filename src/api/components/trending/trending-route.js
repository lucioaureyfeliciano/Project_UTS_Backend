const express = require('express');

const trendingController = require('./trending-controller');

const route = express.Router();

module.exports = (app) => {
  // prefix /trending
  app.use('/trending', route);

  // GET /trending
  route.get('/', trendingController.getTrending);
};
