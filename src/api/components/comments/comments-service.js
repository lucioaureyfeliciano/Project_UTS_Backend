const commentsRepository = require('./comments-repository');

async function getCommentsByPost(postId) {
  return commentsRepository.getCommentsByPost(postId);
}

async function getComment(id) {
  return commentsRepository.getComment(id);
}

async function createComment(postId, userId, content) {
  return commentsRepository.createComment(postId, userId, content);
}

async function updateComment(id, content) {
  return commentsRepository.updateComment(id, content);
}

async function deleteComment(id) {
  return commentsRepository.deleteComment(id);
}

module.exports = {
  getCommentsByPost,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
