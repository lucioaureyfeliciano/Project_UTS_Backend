const { Tweets } = require('../../../models');

async function createTweet(userId, username, text) {
  return Tweets.create({
    userId,
    username,
    text,
  });
}

async function getTweetByTweetId(tweetId) {
  return Tweets.findOne({ tweetId });
}

// hapus tweets tertentu
async function deleteTweetByTweetId(tweetId) {
  return Tweets.deleteOne({ tweetId });
}

// ambil tweets terbaru
async function getRecentTweets() {
  return Tweets.find().sort({ createdAt: -1 }).limit(10);
}

// ambil semua tweet punya user tertentu
async function getTweetsByUserId(userId) {
  return Tweets.find({ userId });
}

module.exports = {
  createTweet,
  getTweetByTweetId,
  deleteTweetByTweetId,
  getRecentTweets,
  getTweetsByUserId,
};
