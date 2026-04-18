const { Tweets, Likes, Retweets } = require('../../../models');

async function createTweet(userId, username, text) {
  return Tweets.create({
    userId,
    username,
    text,
  });
}

async function getTweetByTweetId(tweetId) {
  const tweet = await Tweets.findOne({ tweetId });

  if (!tweet) {
    return {
      error: 'NOT_FOUND',
      message: 'Tweet not found',
    };
  }

  const likesCount = await Likes.countDocuments({ tweetId });
  const repostCount = await Retweets.countDocuments({ tweetId });

  return {
    ...tweet.toJSON(),
    likesCount,
    repostCount,
  };
}

// hapus tweets tertentu
async function deleteTweetByTweetId(tweetId) {
  return Tweets.deleteOne({ tweetId });
}

// ambil tweets terbaru + total likes + repost
async function getRecentTweets() {
  const tweets = await Tweets.find().sort({ createdAt: -1 }).limit(10);

  const result = await Promise.all(
    tweets.map(async (tweet) => {
      const likesCount = await Likes.countDocuments({
        tweetId: tweet.tweetId,
      });

      const repostCount = await Retweets.countDocuments({
        tweetId: tweet.tweetId,
      });

      return {
        ...tweet.toJSON(),
        likesCount,
        repostCount,
      };
    })
  );

  return result;
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
