const { Comments } = require("../../../models");

// ambil semua komentar untuk sebuah tweet
async function getCommentsByTweetId(tweetId) {
  return Comments.find({ tweetId, parentId: null })
    .populate("userId", "username")
    .sort({ createdAt: -1 });
}

// ambil sebuah komentar berdasarkan id
async function getCommentById(id) {
  return Comments.findById(id).populate("userId", "username");
}

// buat komentar baru
async function createComment(tweetId, userId, content) {
  return Comments.create({ tweetId, userId, content, parentId: null });
}

// edit komentar
async function updateComment(id, content) {
  return Comments.findByIdAndUpdate(id, { content }, { new: true }).populate(
    "userId",
    "username",
  );
}

// hapus komentar
async function deleteComment(id) {
  return Comments.findByIdAndDelete(id);
}

// buat reply terhadap komentar tertentu
async function createReply(tweetId, parentId, userId, content) {
  return Comments.create({ tweetId, userId, content, parentId });
}

// ambil semua reply dari komentar tertentu
async function getRepliesByCommentId(parentId) {
  return Comments.find({ parentId })
    .populate("userId", "username")
    .sort({ createdAt: 1 });
}

// hitung total komentar pada tweet (komentar + reply)
async function countCommentsByTweetId(tweetId) {
  return Comments.countDocuments({ tweetId });
}

module.exports = {
  getCommentsByTweetId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  createReply,
  getRepliesByCommentId,
  countCommentsByTweetId,
};
