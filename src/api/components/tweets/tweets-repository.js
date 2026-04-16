const { Tweets } = require('../../../models');

function generateTweetId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'tw_';
  for (let i = 0; i < 8; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function createTweet(userId, username, text) {
  const tweetId = generateTweetId();
  return Tweets.create({
    userId,
    username,
    text,
    tweetId,
  });
}

async function getTweetByTweetId(tweetId) {
  return Tweets.findOne({ tweetId });
}

module.exports = {
  createTweet,
  getTweetByTweetId,
};
