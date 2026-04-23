const express = require('express');
const profilesController = require('./profiles-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/profiles', route);

  route.get('/:userId', authMiddleware, profilesController.getProfile);
};
