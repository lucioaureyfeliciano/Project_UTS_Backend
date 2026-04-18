const express = require('express');

const users = require('./components/users/users-route');
const comments = require('./components/comments/comments-route.js');
const bookmarks = require('./components/bookmarks/bookmarks-route.js');
const notifications = require('./components/notifications/notifications-route.js');
const auth = require('./components/auth/auth-route');
const tweets = require('./components/tweets/tweets-route');
const repost = require('./components/repost/repost-route');
const messages = require('./components/messages/messages-route');

module.exports = () => {
  const app = express.Router();

  users(app);
  comments(app);
  notifications(app);
  bookmarks(app);
  auth(app);
  tweets(app);
  messages(app);
  repost(app);

  return app;
};
