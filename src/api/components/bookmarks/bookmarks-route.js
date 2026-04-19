const express = require('express');
const bookmarksController = require('./bookmarks-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router({ mergeParams: true });

module.exports = (app) => {
  app.use('/users/:id/bookmarks', route);

  // POST /users/:id/bookmarks -> tambah bookmark
  route.post('/', authMiddleware, bookmarksController.addBookmark);

  // GET /users/:id/bookmarks/check/:tweet_id -> cek apakah tweet sudah dibookmark
  route.get(
    '/check/:tweet_id',
    authMiddleware,
    bookmarksController.checkBookmark
  );

  // GET /users/:id/bookmarks -> lihat semua bookmark
  route.get('/', authMiddleware, bookmarksController.getBookmarks);

  // DELETE /users/:id/bookmarks/:tweet_id -> hapus satu bookmark
  route.delete(
    '/:tweet_id',
    authMiddleware,
    bookmarksController.removeBookmark
  );

  // DELETE /users/:id/bookmarks -> hapus semua bookmark
  route.delete('/', authMiddleware, bookmarksController.clearBookmarks);

  // GET /users/:id/bookmarks/count -> hitung total bookmark
  route.get('/count', authMiddleware, bookmarksController.countBookmarks);
};
