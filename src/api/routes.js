const express = require('express');

const auth = require('./components/auth/auth-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const community = require('./components/communities/community-route');
const usage = require('./components/usage/usage-route');
const tweets = require('./components/tweets/tweets-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  books(app);
  users(app);
  community(app);
  usage(app);
  tweets(app);

  return app;
};
