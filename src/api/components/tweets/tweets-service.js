const tweetsRepository = require('./tweets-repository');

async function createTweet(userId, username, text) {
  return tweetsRepository.createTweet(userId, username, text);
}

async function getTweetByTweetId(tweetId) {
  return tweetsRepository.getTweetByTweetId(tweetId);
}

async function deleteTweetByTweetId(tweetId) {
  return tweetsRepository.deleteTweetByTweetId(tweetId);
}

async function getRecentTweets() {
  return tweetsRepository.getRecentTweets();
}

async function getTweetsByUserId(userId) {
  return tweetsRepository.getTweetsByUserId(userId);
}

module.exports = {
  createTweet,
  getTweetByTweetId,
  deleteTweetByTweetId,
  getRecentTweets,
  getTweetsByUserId,
};
