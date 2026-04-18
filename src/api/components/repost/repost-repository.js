const { Retweets, Tweets } = require('../../../models');

// Memastikan user sudah pernah repost tweet ini
async function findRepost(tweetId, userId) {
  return Retweets.findOne({ tweetId, userId });
}

// Simpan repost baru
async function createRepost(tweetId, userId) {
  return Retweets.create({ tweetId, userId });
}

// Hapus repost
async function deleteRepost(tweetId, userId) {
  return Retweets.findOneAndDelete({ tweetId, userId });
}

// Ambil semua repost dari suatu tweet
async function getRepostsByTweetId(tweetId) {
  return Retweets.find({ tweetId });
}

// Mengecek apakah tweet dengan tweetId tsb ada
async function findTweetByTweetId(tweetId) {
  return Tweets.findOne({ tweetId });
}

module.exports = {
  findRepost,
  createRepost,
  deleteRepost,
  getRepostsByTweetId,
  findTweetByTweetId,
};
