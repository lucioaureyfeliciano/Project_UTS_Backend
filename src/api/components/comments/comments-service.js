const commentsRepository = require('./comments-repository');
const notificationsService = require('../notifications/notifications-service');
const notificationsRepository = require('../notifications/notifications-repository');
const tweetsRepository = require('../tweets/tweets-repository');
const { isBlocked } = require('../../../utils/block');
const { isMuted } = require('../../../utils/mute');

async function createComment(tweetId, userId, content) {
  const tweet = await tweetsRepository.getTweetByTweetId(tweetId);
  if (!tweet || tweet.error) return null;

  const tweetOwnerId = tweet.userId;

  if (await isBlocked(tweetOwnerId, userId)) {
    return null;
  }

  // cek mute dulu
  const isMutedUser =
    tweetOwnerId !== userId && (await isMuted(tweetOwnerId, userId));

  // tetap buat comment
  const comment = await commentsRepository.createComment(
    tweetId,
    userId,
    content
  );

  // hanya kirim notif kalau tidak di-mute
  if (tweetOwnerId !== userId && !isMutedUser) {
    await notificationsService.createNotification(
      tweetOwnerId,
      userId,
      'comment',
      tweetId
    );
  }

  return comment;
}

async function getCommentsByTweetId(tweetId, currentUserId = null) {
  const comments = await commentsRepository.getCommentsByTweetId(tweetId);

  if (!currentUserId) {
    return { tweetId, totalComments: comments.length, comments };
  }

  const filtered = await Promise.all(
    comments.map(async (comment) => {
      const commentUserId = comment.userId?.id || comment.userId;
      if (await isBlocked(currentUserId, commentUserId)) return null;
      return comment;
    })
  );

  const result = filtered.filter(Boolean);
  return { tweetId, totalComments: result.length, comments: result };
}

async function getCommentById(id) {
  return commentsRepository.getCommentById(id);
}

async function updateComment(id, userId, content) {
  const comment = await commentsRepository.getCommentById(id);
  if (!comment) return null;

  if (comment.userId !== userId) return 'forbidden';

  return commentsRepository.updateComment(id, content);
}

async function deleteComment(id, userId) {
  const comment = await commentsRepository.getCommentById(id);
  if (!comment) return null;

  if (comment.userId !== userId) return 'forbidden';

  await commentsRepository.deleteComment(id);
  return true;
}

async function createReply(commentId, userId, content) {
  const parentComment = await commentsRepository.getCommentById(commentId);
  if (!parentComment) return null;

  if (await isBlocked(parentComment.userId, userId)) {
    return null;
  }

  const reply = await commentsRepository.createReply(
    parentComment.tweetId,
    commentId,
    userId,
    content
  );

  if (parentComment.userId !== userId) {
    const blocked = await isBlocked(parentComment.userId, userId);
    const muted = await isMuted(parentComment.userId, userId);

    if (!blocked && !muted) {
      await notificationsRepository.createNotification(
        parentComment.userId,
        userId,
        'comment',
        parentComment.tweetId
      );
    }
  }

  return reply;
}

async function getRepliesByCommentId(commentId, currentUserId = null) {
  const replies = await commentsRepository.getRepliesByCommentId(commentId);

  if (!currentUserId) {
    return { commentId, totalReplies: replies.length, replies };
  }

  const filtered = await Promise.all(
    replies.map(async (reply) => {
      const replyUserId = reply.userId?.id || reply.userId;
      if (await isBlocked(currentUserId, replyUserId)) return null;

      return reply;
    })
  );

  const result = filtered.filter(Boolean);
  return { commentId, totalReplies: result.length, replies: result };
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
