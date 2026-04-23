const { Tweets } = require('../../../models');

async function getAllTweets() {
  return Tweets.find().select('tweetId userId text createdAt');
}

async function getTweetsByUserIds(userIds) {
  return Tweets.find({
    userId: { $in: userIds },
  }).select('tweetId userId text createdAt');
}

async function getTweetsByIds(tweetIds) {
  return Tweets.find({
    tweetId: { $in: tweetIds },
  }).select('tweetId userId text createdAt');
}

module.exports = {
  getAllTweets,
  getTweetsByUserIds,
  getTweetsByIds,
};
