const dislikesRepository = require('./dislikes-repository');
const { Users, Tweets } = require('../../../models');

async function dislikeTweet(tweetId, userId) {
  const tweet = await dislikesRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  const existing = await dislikesRepository.findDislike(tweetId, userId);
  if (existing) {
    return {
      error: 'CONFLICT',
      message: 'You already disliked this tweet',
    };
  }

  const dislike = await dislikesRepository.createDislike(tweetId, userId);
  const totalDislikes =
    await dislikesRepository.countDislikesByTweetId(tweetId);

  return {
    message: 'You disliked this tweet',
    data: {
      dislikedAt: dislike.dislikedAt,
      dislikesCount: totalDislikes,
      tweet: tweet.toJSON(),
    },
  };
}

async function undislikeTweet(tweetId, userId) {
  const tweet = await dislikesRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  const existing = await dislikesRepository.findDislike(tweetId, userId);
  if (!existing) {
    return { error: 'NOT_FOUND', message: 'Dislike not found' };
  }

  await dislikesRepository.deleteDislike(tweetId, userId);
  const totalDislikes =
    await dislikesRepository.countDislikesByTweetId(tweetId);

  return {
    message: 'Dislike is successfully removed',
    data: {
      tweetId,
      text: tweet?.text,
      dislikesCount: totalDislikes,
    },
  };
}

async function getUsersWhoDisliked(tweetId) {
  const tweet = await dislikesRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  const dislikes = await dislikesRepository.getDislikesByTweetId(tweetId);

  const result = await Promise.all(
    dislikes.map(async (d) => {
      const user = await Users.findOne({ userId: d.userId });

      return {
        userId: d.userId,
        username: user?.username || null,
        dislikedAt: d.dislikedAt,
      };
    })
  );

  return {
    message: result.length
      ? 'Tweet has been disliked by'
      : 'Tweet has no dislikes yet',
    count: result.length,
    data: result,
  };
}

async function getDislikedTweetsByUser(userId) {
  const dislikes = await dislikesRepository.getDislikesByUserId(userId);

  const result = await Promise.all(
    dislikes.map(async (d) => {
      const tweet = await Tweets.findOne({ tweetId: d.tweetId });

      return {
        tweetId: d.tweetId,
        text: tweet?.text,
        dislikedAt: d.dislikedAt,
      };
    })
  );

  return {
    message: result.length
      ? 'This user have disliked'
      : 'This user have not made any dislike',
    count: result.length,
    data: result,
  };
}

module.exports = {
  dislikeTweet,
  undislikeTweet,
  getUsersWhoDisliked,
  getDislikedTweetsByUser,
};
