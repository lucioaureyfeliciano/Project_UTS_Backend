const bookmarksRepository = require('./bookmarks-repository');
const tweetsRepository = require('../tweets/tweets-repository');
const { isBlocked } = require('../../../utils/block');

async function addBookmark(userId, tweetId, requesterId) {
  if (userId !== requesterId) return 'forbidden';

  const tweet = await tweetsRepository.getTweetByTweetId(tweetId);
  if (!tweet || tweet.error) return null;

  if (await isBlocked(tweet.userId, requesterId)) {
    return null;
  }

  const existing = await bookmarksRepository.findBookmark(userId, tweetId);
  if (existing) return 'already_bookmarked';

  return bookmarksRepository.createBookmark(userId, tweetId);
}

async function checkBookmark(userId, tweetId, requesterId) {
  if (userId !== requesterId) return 'forbidden';

  const tweet = await tweetsRepository.getTweetByTweetId(tweetId);
  if (!tweet || tweet.error) return null;

  if (await isBlocked(tweet.userId, requesterId)) {
    return null;
  }

  const existing = await bookmarksRepository.findBookmark(userId, tweetId);
  return { isBookmarked: !!existing };
}

async function getBookmarks(userId, requesterId) {
  if (userId !== requesterId) return 'forbidden';

  const bookmarks = await bookmarksRepository.getBookmarksByUserId(userId);

  const filtered = await Promise.all(
    bookmarks.map(async (b) => {
      const tweet = await tweetsRepository.getTweetByTweetId(b.tweetId);
      if (!tweet || tweet.error) return null;

      if (await isBlocked(tweet.userId, requesterId)) return null;

      return b;
    })
  );

  return filtered.filter(Boolean);
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

  const bookmarks = await bookmarksRepository.getBookmarksByUserId(userId);

  const filtered = await Promise.all(
    bookmarks.map(async (b) => {
      const tweet = await tweetsRepository.getTweetByTweetId(b.tweetId);
      if (!tweet || tweet.error) return null;

      if (await isBlocked(tweet.userId, requesterId)) return null;

      return b;
    })
  );

  return {
    userId,
    totalBookmarks: filtered.filter(Boolean).length,
  };
}

module.exports = {
  getBookmarks,
  checkBookmark,
  addBookmark,
  removeBookmark,
  clearBookmarks,
  countBookmarks,
};
