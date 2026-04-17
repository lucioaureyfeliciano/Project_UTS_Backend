const { Likes, Tweets } = require('../../../models');

async function findLike(tweetId, userId) {
  return Likes.findOne({ tweetId, userId });
}

async function createLike(tweetId, userId) {
  return Likes.create({ tweetId, userId });
}

async function deleteLike(tweetId, userId) {
  return Likes.findOneAndDelete({ tweetId, userId });
}

async function findTweetByTweetId(tweetId) {
  return Tweets.findOne({ tweetId });
}

async function getLikesByTweetId(tweetId) {
  return Likes.find({ tweetId });
}

async function getLikesByUserId(userId) {
  return Likes.find({ userId });
}

async function countLikesByTweetId(tweetId) {
  return Likes.countDocuments({ tweetId });
}

module.exports = {
  findLike,
  createLike,
  deleteLike,
  findTweetByTweetId,
  getLikesByTweetId,
  getLikesByUserId,
  countLikesByTweetId,
};
