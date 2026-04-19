const { Bookmarks } = require('../../../models');

async function createBookmark(userId, tweetId) {
  return Bookmarks.create({ userId, tweetId });
}

async function findBookmark(userId, tweetId) {
  return Bookmarks.findOne({ userId, tweetId });
}

async function getBookmarksByUserId(userId) {
  return Bookmarks.find({ userId }).sort({ createdAt: -1 });
}

async function deleteBookmark(userId, tweetId) {
  return Bookmarks.findOneAndDelete({ userId, tweetId });
}

async function deleteAllBookmarks(userId) {
  return Bookmarks.deleteMany({ userId });
}

async function countBookmarks(userId) {
  return Bookmarks.countDocuments({ userId });
}

module.exports = {
  createBookmark,
  findBookmark,
  getBookmarksByUserId,
  deleteBookmark,
  deleteAllBookmarks,
  countBookmarks,
};
