const retweetsRepository = require('./repost-repository');
const { Users } = require('../../../models');
// untuk endpoint notifications
const notificationsRepository = require('../notifications/notifications-repository');

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

  // untuk endpoint notifications
  if (tweet.userId && tweet.userId.toString() !== userId.toString()) {
    await notificationsRepository.createNotification(
      tweet.userId,
      userId,
      'repost',
      tweetId
    );
  }

  return {
    message: 'Tweet reposted successfully',
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

  const result = await Promise.all(
    reposts.map(async (r) => {
      const user = await Users.findOne({ userId: r.userId });

      return {
        userId: r.userId,
        username: user?.username || null,
        retweetedAt: r.retweetedAt,
      };
    })
  );

  return {
    tweet: tweet.toJSON(),
    message: result.length ? 'Has been reposted by' : 'No reposts yet',
    count: result.length,
    data: result,
  };
}

module.exports = {
  repostTweet,
  unrepostTweet,
  getRepostsOfTweet,
};
