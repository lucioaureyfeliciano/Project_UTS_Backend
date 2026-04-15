const { Bookmarks } = require("../../../models");

async function getBookmarks(userId) {
  return Bookmarks.find({ userId }).sort({ createdAt: -1 });
}

async function getBookmark(userId, tweetId) {
  return Bookmarks.findOne({ userId, tweetId });
}

async function addBookmark(userId, tweetId) {
  return Bookmarks.create({ userId, tweetId });
}

async function removeBookmark(userId, tweetId) {
  return Bookmarks.deleteOne({ userId, tweetId });
}

async function removeAllBookmarks(userId) {
  return Bookmarks.deleteMany({ userId });
}

module.exports = {
  getBookmarks,
  getBookmark,
  addBookmark,
  removeBookmark,
  removeAllBookmarks,
};
