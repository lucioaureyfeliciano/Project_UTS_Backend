const express = require('express');
const commentsController = require('./comments-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();
const tweetRoute = express.Router();

module.exports = (app) => {
  app.use('/comments', route);

  // route khusus /tweets/:id/comments (gabung dengan tweets router)
  app.use('/tweets', tweetRoute);

  // POST /tweets/:id/comments -> buat komentar (harus login)
  tweetRoute.post(
    '/:id/comments',
    authMiddleware,
    commentsController.createComment
  );

  // PUT  /comments/:id        -> edit komentar (harus login)
  route.put('/:id', authMiddleware, commentsController.updateComment);

  // DELETE /comments/:id      -> hapus komentar (harus login)
  route.delete('/:id', authMiddleware, commentsController.deleteComment);

  // POST /comments/:id/replies-> reply komentar (harus login)
  route.post('/:id/replies', authMiddleware, commentsController.createReply);

  // GET /comments/:id/replies -> ambil semua reply
  route.get('/:id/replies', commentsController.getRepliesByCommentId);

  // GET /tweets/:id/comments  -> ambil semua komentar tweet berdasarkan id tweet
  tweetRoute.get('/:id/comments', commentsController.getCommentsByTweetId);

  // GET /comments/:id         -> ambil sebuah komentar berdasarkan id komentar
  route.get('/:id', commentsController.getCommentById);

  // GET /tweets/:id/comments/count -> hitung total komentar
  tweetRoute.get(
    '/:id/comments/count',
    commentsController.countCommentsByTweetId
  );
};
