const { Comments } = require('../../../models');

async function getCommentsByPost(postId) {
  return Comments.find({ postId }).sort({ createdAt: -1 });
}

async function getComment(id) {
  return Comments.findById(id);
}

async function createComment(postId, userId, content) {
  return Comments.create({ postId, userId, content });
}

async function updateComment(id, content) {
  return Comments.updateOne({ _id: id }, { $set: { content } });
}

async function deleteComment(id) {
  return Comments.deleteOne({ _id: id });
}

module.exports = {
  getCommentsByPost,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
