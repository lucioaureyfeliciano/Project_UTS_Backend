const express = require('express');

const auth = require('./components/auth/auth-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const tweets = require('./components/tweets/tweets-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  books(app);
  users(app);
  tweets(app);

  return app;
};
