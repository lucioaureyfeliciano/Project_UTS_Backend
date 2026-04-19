const bookmarksRepository = require('./bookmarks-repository');

async function addBookmark(userId, tweetId, requesterId) {
  if (userId !== requesterId) return 'forbidden';

  const existing = await bookmarksRepository.findBookmark(userId, tweetId);
  if (existing) return 'already_bookmarked';
  return bookmarksRepository.createBookmark(userId, tweetId);
}

async function checkBookmark(userId, tweetId, requesterId) {
  if (userId !== requesterId) return 'forbidden';

  const existing = await bookmarksRepository.findBookmark(userId, tweetId);
  return { isBookmarked: !!existing };
}

async function getBookmarks(userId, requesterId) {
  if (userId !== requesterId) return 'forbidden';
  return bookmarksRepository.getBookmarksByUserId(userId);
}

async function removeBookmark(userId, tweetId, requesterId) {
  if (userId !== requesterId) return 'forbidden';

  const existing = await bookmarksRepository.findBookmark(userId, tweetId);
  if (!existing) return 'not_found';

  await bookmarksRepository.deleteBookmark(userId, tweetId);
  return true;
}

async function clearBookmarks(userId, requesterId) {
  if (userId !== requesterId) return 'forbidden';
  await bookmarksRepository.deleteAllBookmarks(userId);
  return true;
}

async function countBookmarks(userId, requesterId) {
  if (userId !== requesterId) return 'forbidden';
  const count = await bookmarksRepository.countBookmarks(userId);
  return { userId, totalBookmarks: count };
}

module.exports = {
  getBookmarks,
  checkBookmark,
  addBookmark,
  removeBookmark,
  clearBookmarks,
  countBookmarks,
};
