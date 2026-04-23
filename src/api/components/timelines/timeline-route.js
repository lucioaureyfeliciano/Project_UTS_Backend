const express = require('express');

const timelineController = require('./timeline-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  // semua route timelines diprefix /timelines
  app.use('/timelines', route);

  // 1. Home timeline (global)
  route.get('/', authMiddleware, timelineController.getTimeline);

  // 2. Following timeline
  route.get(
    '/following',
    authMiddleware,
    timelineController.getFollowingTimeline
  );

  // 3. Liked tweets
  route.get('/likes', authMiddleware, timelineController.getLikedTimeline);
};
