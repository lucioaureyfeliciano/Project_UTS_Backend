const express = require("express");

const users = require("./components/users/users-route");
const comments = require("./components/comments/comments-route.js");
const bookmarks = require("./components/bookmarks/bookmarks-route.js");
const notifications = require("./components/notifications/notifications-route.js");

module.exports = () => {
  const app = express.Router();

  users(app);
  comments(app);
  notifications(app);
  bookmarks(app);

  return app;
};
