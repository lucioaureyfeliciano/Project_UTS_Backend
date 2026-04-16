const express = require('express');
const communityController = require('./community-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/communities', route);

  // Get list of communities
  route.get('/', communityController.getCommunities);

  // Get a community by id
  route.get('/:id', communityController.getCommunity);

  // Get members of a community
  route.get('/:id/members', communityController.getCommunityMembers);

  // Create a new community
  route.post('/', communityController.createCommunity);

  // Join a community
  route.post('/:id/join', communityController.joinCommunity);

  // Leave a community
  route.post('/:id/leave', communityController.leaveCommunity);

  // Update a community by id
  route.put('/:id', communityController.updateCommunity);

  // Delete a community by id
  route.delete('/:id', communityController.deleteCommunity);
};
