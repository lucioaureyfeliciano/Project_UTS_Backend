const { Comments } = require('../../../models');

async function createComment(tweetId, userId, content) {
  return Comments.create({ tweetId, userId, content, parentId: null });
}

async function getCommentsByTweetId(tweetId) {
  return Comments.find({ tweetId, parentId: null })
    .populate('userId', 'username')
    .sort({ createdAt: -1 });
}

async function getCommentById(id) {
  return Comments.findOne({ commentId: id }).populate('userId', 'username');
}

async function updateComment(id, content) {
  return Comments.findOneAndUpdate(
    { commentId: id },
    { content },
    { new: true }
  ).populate('userId', 'username');
}

async function deleteComment(id) {
  return Comments.findOneAndDelete({ commentId: id });
}

async function createReply(tweetId, parentId, userId, content) {
  return Comments.create({ tweetId, userId, content, parentId });
}

async function getRepliesByCommentId(parentId) {
  return Comments.find({ parentId })
    .populate('userId', 'username')
    .sort({ createdAt: 1 });
}

async function countCommentsByTweetId(tweetId) {
  return Comments.countDocuments({ tweetId });
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
