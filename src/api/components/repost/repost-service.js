const retweetsRepository = require('./repost-repository');

async function repostTweet(tweetId, userId) {
  // Cek apakah tweet asli ada
  const tweet = await retweetsRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  // Cek apakah sudah pernah repost
  const existing = await retweetsRepository.findRepost(tweetId, userId);
  if (existing) {
    return {
      error: 'CONFLICT',
      message: 'You have already reposted this tweet',
    };
  }

  const repost = await retweetsRepository.createRepost(tweetId, userId);
  return {
    message: 'Is reposted:',
    data: {
      tweet: tweet.toJSON(),
      success: true,
      retweetedAt: repost.retweetedAt,
    },
  };
}

async function unrepostTweet(tweetId, userId) {
  // Untuk memastikan tweets beneran ada, maka dicek dulu.
  const tweet = await retweetsRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  // Memastikan repost yang mau dihapus ada.
  const existing = await retweetsRepository.findRepost(tweetId, userId);
  if (!existing) {
    return { error: 'NOT_FOUND', message: 'Repost not found' };
  }

  await retweetsRepository.deleteRepost(tweetId, userId);
  return {
    data: {
      tweet: tweet.toJSON(),
      retweetedAt: existing.retweetedAt,
      message: 'Repost removed successfully',
    },
  };
}

async function getRepostsOfTweet(tweetId) {
  // Cek apakah tweet asli ada
  const tweet = await retweetsRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  const reposts = await retweetsRepository.getRepostsByTweetId(tweetId);
  return {
    message: reposts.length ? 'Reposts retrieved!' : 'No reposts yet',
    count: reposts.length,
    data: reposts,
  };
}

module.exports = {
  repostTweet,
  unrepostTweet,
  getRepostsOfTweet,
};
