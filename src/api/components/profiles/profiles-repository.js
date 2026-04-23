const {
  Users,
  Tweets,
  Likes,
  Retweets,
  Follows,
  Blocks,
} = require('../../../models');

async function getUserByUserId(userId) {
  return Users.findOne({ userId });
}

async function getTweetsByUserId(userId) {
  return Tweets.find({ userId }).sort({ createdAt: -1 }).limit(10);
}

async function countFollowers(userId) {
  return Follows.countDocuments({ followingId: userId });
}

async function countFollowing(userId) {
  return Follows.countDocuments({ followerId: userId });
}

async function countTweets(userId) {
  return Tweets.countDocuments({ userId });
}

async function countTotalLikes(userId) {
  const tweets = await Tweets.find({ userId });
  const tweetIds = tweets.map((t) => t.tweetId);

  return Likes.countDocuments({
    tweetId: { $in: tweetIds },
  });
}

async function countTotalReposts(userId) {
  const tweets = await Tweets.find({ userId });
  const tweetIds = tweets.map((t) => t.tweetId);

  return Retweets.countDocuments({
    tweetId: { $in: tweetIds },
  });
}

async function isFollowing(currentUserId, targetUserId) {
  return Follows.findOne({
    followerId: currentUserId,
    followingId: targetUserId,
  });
}

async function isBlocked(currentUserId, targetUserId) {
  return Blocks.findOne({
    userId: currentUserId,
    blockedId: targetUserId,
  });
}

async function isBlockedByTarget(currentUserId, targetUserId) {
  return Blocks.findOne({
    userId: targetUserId,
    blockedId: currentUserId,
  });
}

module.exports = {
  getUserByUserId,
  getTweetsByUserId,
  countFollowers,
  countFollowing,
  countTweets,
  countTotalLikes,
  countTotalReposts,
  isFollowing,
  isBlocked,
  isBlockedByTarget,
};
