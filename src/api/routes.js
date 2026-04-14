const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const communityRoutes = require('./components/communities/community.routes');
const usageRoutes = require('./components/usage/usage.routes');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  communityRoutes(app);
  usageRoutes(app);

  return app;
};
