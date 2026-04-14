const express = require('express');
const router = express.Router();
const communityController = require('./community.controller');
const { authenticate } = require('../../../middlewares/auth.middleware');

router.get('/', communityController.getAllCommunities);
router.get('/:id', communityController.getCommunityById);
router.post('/', authenticate, communityController.createCommunity);
router.post('/:id/join', authenticate, communityController.joinCommunity);
router.post('/:id/leave', authenticate, communityController.leaveCommunity);

module.exports = router;
