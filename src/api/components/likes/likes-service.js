const likesRepository = require('./likes-repository');
const { Users, Tweets } = require('../../../models');
const blockService = require('../block/block-service');
// untuk endpoint notifications
const notificationsRepository = require('../notifications/notifications-repository');

async function likeTweet(tweetId, userId) {
  const tweet = await likesRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  // Ini untuk ngecek apakah user nya di block atau tidak
  const blocked = await blockService.cannotInteract(userId, tweet.userId);

  if (blocked) {
    return {
      error: 'FORBIDDEN',
      message:
        'You cannot like this tweet, you might either blocked/get blocked',
    };
  }

  const existing = await likesRepository.findLike(tweetId, userId);
  if (existing) {
    return {
      error: 'CONFLICT',
      message: 'You already liked this tweet',
    };
  }

  const like = await likesRepository.createLike(tweetId, userId);
  const totalLikes = await likesRepository.countLikesByTweetId(tweetId);

  // untuk endpoint notifications
  if (tweet.userId && tweet.userId.toString() !== userId.toString()) {
    await notificationsRepository.createNotification(
      tweet.userId,
      userId,
      'like',
      tweetId
    );
  }

  return {
    message: 'You liked this tweet',
    data: {
      likedAt: like.likedAt,
      likesCount: totalLikes,
      tweet: tweet.toJSON(),
    },
  };
}

async function unlikeTweet(tweetId, userId) {
  const tweet = await likesRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  const existing = await likesRepository.findLike(tweetId, userId);
  if (!existing) {
    return { error: 'NOT_FOUND', message: 'Like not found' };
  }

  await likesRepository.deleteLike(tweetId, userId);
  const totalLikes = await likesRepository.countLikesByTweetId(tweetId);

  return {
    message: 'Like is successfully removed',
    data: {
      tweetId,
      text: tweet?.text,
      likesCount: totalLikes,
    },
  };
}

async function getUsersWhoLiked(tweetId) {
  const tweet = await likesRepository.findTweetByTweetId(tweetId);
  if (!tweet) {
    return { error: 'NOT_FOUND', message: 'Tweet not found' };
  }

  const likes = await likesRepository.getLikesByTweetId(tweetId);

  const result = await Promise.all(
    likes.map(async (l) => {
      const user = await Users.findOne({ userId: l.userId });

      return {
        userId: l.userId,
        username: user?.username || null,
        likedAt: l.likedAt,
      };
    })
  );

  return {
    message: result.length
      ? 'Tweet has been liked by'
      : 'Tweet has no likes yet',
    count: result.length,
    data: result,
  };
}

async function getLikedTweetsByUser(userId) {
  const likes = await likesRepository.getLikesByUserId(userId);

  const result = await Promise.all(
    likes.map(async (l) => {
      const tweet = await Tweets.findOne({ tweetId: l.tweetId });

      return {
        tweetId: l.tweetId,
        text: tweet?.text,
        likedAt: l.likedAt,
      };
    })
  );

  return {
    message: result.length
      ? 'This user have liked'
      : 'This user have not made any like',
    count: result.length,
    data: result,
  };
}

module.exports = {
  likeTweet,
  unlikeTweet,
  getUsersWhoLiked,
  getLikedTweetsByUser,
};
