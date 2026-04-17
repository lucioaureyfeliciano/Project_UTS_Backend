const { Tweets, Likes, Retweets } = require('../../../models');

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

async function getTweetDetail(tweetId) {
  const tweet = await Tweets.findOne({ tweetId });
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  const likesCount = await Likes.countDocuments({ tweetId });
  const repostCount = await Retweets.countDocuments({ tweetId });

  return {
    ...tweet.toJSON(),
    likesCount,
    repostCount,
  };
}

module.exports = {
  createTweet,
  getTweetByTweetId,
  getTweetDetail,
};
