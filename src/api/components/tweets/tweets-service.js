const tweetsRepository = require('./tweets-repository');
const { Likes, Dislikes, Retweets, Comments } = require('../../../models');
const { isBlocked } = require('../../../utils/block');
const { isMuted } = require('../../../utils/mute');

async function attachTweetStats(tweet) {
  const { tweetId } = tweet;

  const [likesCount, dislikesCount, repostCount, commentsCount] =
    await Promise.all([
      Likes.countDocuments({ tweetId }),
      Dislikes.countDocuments({ tweetId }),
      Retweets.countDocuments({ tweetId }),
      Comments.countDocuments({ tweetId }),
    ]);

  return {
    ...tweet.toJSON(),
    likesCount,
    dislikesCount,
    repostCount,
    commentsCount,
  };
}

async function createTweet(userId, username, text) {
  if (!text || text.trim() === '') {
    throw new Error('Text is required');
  }

  return tweetsRepository.createTweet(userId, username, text);
}

async function getTweetByTweetId(currentUserId, tweetId) {
  const tweet = await tweetsRepository.getTweetByTweetId(tweetId);

  if (!tweet) {
    throw new Error('Tweet not found');
  }

  if (await isBlocked(currentUserId, tweet.userId)) {
    throw new Error('Cannot view this tweet (Blocked)');
  }

  return attachTweetStats(tweet);
}

async function deleteTweetByTweetId(tweetId, userId) {
  const tweet = await tweetsRepository.getTweetByTweetId(tweetId);

  if (!tweet) {
    throw new Error('Tweet not found');
  }

  if (tweet.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return tweetsRepository.deleteTweetByTweetId(tweetId);
}

async function getRecentTweets(currentUserId) {
  const tweets = await tweetsRepository.getRecentTweets();

  const result = [];

  for (const tweet of tweets) {
    if (await isBlocked(currentUserId, tweet.userId)) {
      continue;
    }

    if (await isMuted(currentUserId, tweet.userId)) {
      continue;
    }

    const enriched = await attachTweetStats(tweet);
    result.push(enriched);
  }

  return result;
}

async function getTweetsByUserId(currentUserId, userId) {
  if (await isBlocked(currentUserId, userId)) {
    throw new Error('Cannot view tweets (Blocked)');
  }

  const tweets = await tweetsRepository.getTweetsByUserId(userId);

  return Promise.all(tweets.map(attachTweetStats));
}

module.exports = {
  createTweet,
  getTweetByTweetId,
  deleteTweetByTweetId,
  getRecentTweets,
  getTweetsByUserId,
};
