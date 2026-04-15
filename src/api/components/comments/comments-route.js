const express = require('express');
const commentsController = require('./comments-controller');

const route = express.Router({ mergeParams: true }); // penting: mergeParams agar :id dari posts terbaca

module.exports = (app) => {
  app.use('/posts/:id/comments', route);

  // GET  /posts/:id/comments  -> ambil semua komentar pada post
  route.get('/', commentsController.getComments);

  // POST /posts/:id/comments  -> tambah komentar
  route.post('/', commentsController.createComment);

  // PUT  /comments/:id        -> edit komentar
  app.put('/comments/:id', commentsController.updateComment);

  // DELETE /comments/:id      -> hapus komentar
  app.delete('/comments/:id', commentsController.deleteComment);
};
