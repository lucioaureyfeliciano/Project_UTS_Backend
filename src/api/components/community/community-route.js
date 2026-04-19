const express = require('express');
const communityController = require('./community-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/community', route);

  // Get list of community
  route.get('/', communityController.getAllCommunity);

  // Get a community by id
  route.get('/:id', communityController.getCommunityById);

  // Get members of a community
  route.get('/:id/members', communityController.getCommunityMembers);

  // Create a new community (harus login)
  route.post('/', authMiddleware, communityController.createCommunity);

  // Join a community (harus login)
  route.post('/:id/join', authMiddleware, communityController.joinCommunity);

  // Leave a community (harus login)
  route.post('/:id/leave', authMiddleware, communityController.leaveCommunity);

  // Update a community by id (harus login)
  route.put('/:id', authMiddleware, communityController.updateCommunity);

  // Delete a community by id (harus login)
  route.delete('/:id', authMiddleware, communityController.deleteCommunity);
};
