const express = require('express');

const users = require('./components/users/users-route');
const comments = require('./components/comments/comments-route');
const bookmarks = require('./components/bookmarks/bookmarks-route');
const notifications = require('./components/notifications/notifications-route');
const auth = require('./components/auth/auth-route');
const tweets = require('./components/tweets/tweets-route');
const repost = require('./components/repost/repost-route');
const block = require('./components/block/block-route');
const mute = require('./components/mute/mute-route');

module.exports = () => {
  const app = express.Router();

  users(app);
  comments(app);
  notifications(app);
  bookmarks(app);
  auth(app);
  tweets(app);
  repost(app);
  block(app);
  mute(app);

  return app;
};
