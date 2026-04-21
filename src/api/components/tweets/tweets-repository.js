const { Tweets } = require('../../../models');

// create
async function createTweet(userId, username, text) {
  return Tweets.create({
    userId,
    username,
    text,
  });
}

// get by id
async function getTweetByTweetId(tweetId) {
  return Tweets.findOne({ tweetId });
}

// delete
async function deleteTweetByTweetId(tweetId) {
  return Tweets.deleteOne({ tweetId });
}

// recent tweets
async function getRecentTweets() {
  return Tweets.find().sort({ createdAt: -1 }).limit(10);
}

// by user
async function getTweetsByUserId(userId) {
  return Tweets.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  createTweet,
  getTweetByTweetId,
  deleteTweetByTweetId,
  getRecentTweets,
  getTweetsByUserId,
};
