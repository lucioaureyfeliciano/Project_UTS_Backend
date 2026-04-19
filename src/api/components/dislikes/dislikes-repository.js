const { Dislikes, Tweets } = require('../../../models');

async function findDislike(tweetId, userId) {
  return Dislikes.findOne({ tweetId, userId });
}

async function createDislike(tweetId, userId) {
  return Dislikes.create({ tweetId, userId });
}

async function deleteDislike(tweetId, userId) {
  return Dislikes.findOneAndDelete({ tweetId, userId });
}

async function findTweetByTweetId(tweetId) {
  return Tweets.findOne({ tweetId });
}

async function getDislikesByTweetId(tweetId) {
  return Dislikes.find({ tweetId });
}

async function getDislikesByUserId(userId) {
  return Dislikes.find({ userId });
}

async function countDislikesByTweetId(tweetId) {
  return Dislikes.countDocuments({ tweetId });
}

module.exports = {
  findDislike,
  createDislike,
  deleteDislike,
  findTweetByTweetId,
  getDislikesByTweetId,
  getDislikesByUserId,
  countDislikesByTweetId,
};
