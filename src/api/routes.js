const express = require('express');

const users = require('./components/users/users-route');
const comments = require('./components/comments/comments-route');
const bookmarks = require('./components/bookmarks/bookmarks-route');
const notifications = require('./components/notifications/notifications-route');
const auth = require('./components/auth/auth-route');
const tweets = require('./components/tweets/tweets-route');
const repost = require('./components/repost/repost-route');
const community = require('./components/community/community-route');
const usage = require('./components/usage/usage-route');
const likes = require('./components/likes/likes-route');
const follows = require('./components/follows/follows-route');
const block = require('./components/block/block-route');
const mute = require('./components/mute/mute-route');
const messages = require('./components/messages/messages-route');
const dislikes = require('./components/dislikes/dislikes-route');
const trending = require('./components/trending/trending-route');
const timelines = require('./components/timelines/timeline-route');
const profiles = require('./components/profiles/profiles-route');

module.exports = () => {
  const app = express.Router();

  users(app);
  community(app);
  usage(app);
  comments(app);
  notifications(app);
  bookmarks(app);
  auth(app);
  tweets(app);
  messages(app);
  repost(app);
  dislikes(app);
  trending(app);
  likes(app);
  follows(app);
  block(app);
  mute(app);
  timelines(app);
  profiles(app);

  return app;
};
