const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const tweets = require('./components/tweets/tweets-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  tweets(app);

  return app;
};
