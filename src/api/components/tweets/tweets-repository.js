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

module.exports = {
  createTweet,
  getTweetByTweetId,
};
