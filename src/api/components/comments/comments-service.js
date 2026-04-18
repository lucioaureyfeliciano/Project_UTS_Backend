const commentsRepository = require('./comments-repository');
const notificationsRepository = require('../notifications/notifications-repository');

async function createComment(tweetId, userId, content, tweetOwnerId) {
  const comment = await commentsRepository.createComment(
    tweetId,
    userId,
    content
  );

  // kirim notifikasi ke pemilik tweet (kalau bukan diri sendiri)
  if (tweetOwnerId && tweetOwnerId.toString() !== userId.toString()) {
    await notificationsRepository.createNotification(
      tweetOwnerId,
      userId,
      'comment',
      tweetId
    );
  }

  return comment;
}

async function getCommentsByTweetId(tweetId) {
  const comments = await commentsRepository.getCommentsByTweetId(tweetId);
  return { tweetId, totalComments: comments.length, comments };
}

async function getCommentById(id) {
  return commentsRepository.getCommentById(id);
}

async function updateComment(id, userId, content) {
  const comment = await commentsRepository.getCommentById(id);
  if (!comment) return null;

  // hanya pemilik komentar yang boleh edit
  if (comment.userId !== userId) return 'forbidden';

  return commentsRepository.updateComment(id, content);
}

async function deleteComment(id, userId) {
  const comment = await commentsRepository.getCommentById(id);
  if (!comment) return null;

  // hanya pemilik komentar yang boleh hapus
  if (comment.userId !== userId) return 'forbidden';

  await commentsRepository.deleteComment(id);
  return true;
}

async function createReply(commentId, userId, content) {
  const parentComment = await commentsRepository.getCommentById(commentId);
  if (!parentComment) return null;

  const reply = await commentsRepository.createReply(
    parentComment.tweetId,
    commentId,
    userId,
    content
  );

  // kirim notifikasi ke pemilik komentar (kalau bukan diri sendiri)
  if (parentComment.userId !== userId) {
    await notificationsRepository.createNotification(
      parentComment.userId,
      userId,
      'comment',
      parentComment.tweetId
    );
  }

  return reply;
}

async function getRepliesByCommentId(commentId) {
  const replies = await commentsRepository.getRepliesByCommentId(commentId);
  return { commentId, totalReplies: replies.length, replies };
}

async function countCommentsByTweetId(tweetId) {
  const count = await commentsRepository.countCommentsByTweetId(tweetId);
  return { tweetId, totalComments: count };
}

module.exports = {
  createComment,
  getCommentsByTweetId,
  getCommentById,
  updateComment,
  deleteComment,
  createReply,
  getRepliesByCommentId,
  countCommentsByTweetId,
};
