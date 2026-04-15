const bookmarksRepository = require("./bookmarks-repository");

async function getBookmarks(userId) {
  return bookmarksRepository.getBookmarks(userId);
}

async function bookmarkExists(userId, tweetId) {
  const bookmark = await bookmarksRepository.getBookmark(userId, tweetId);
  return !!bookmark;
}

async function addBookmark(userId, tweetId) {
  return bookmarksRepository.addBookmark(userId, tweetId);
}

async function removeBookmark(userId, tweetId) {
  return bookmarksRepository.removeBookmark(userId, tweetId);
}

async function removeAllBookmarks(userId) {
  return bookmarksRepository.removeAllBookmarks(userId);
}

module.exports = {
  getBookmarks,
  bookmarkExists,
  addBookmark,
  removeBookmark,
  removeAllBookmarks,
};
