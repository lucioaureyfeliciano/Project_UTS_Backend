const timelineRepository = require('./timeline-repository');
const usersRepository = require('../users/users-repository');
const followsRepository = require('../follows/follows-repository');
const likesRepository = require('../likes/likes-repository');
const { isBlocked } = require('../../../utils/block');

// cache user biar ga N+1 parah
function createUserCache() {
  const cache = {};

  return async function getUser(userId) {
    if (!cache[userId]) {
      cache[userId] = await usersRepository.getUserById(userId);
    }
    return cache[userId];
  };
}

// attach info user ke tweet
async function attachUserInfo(tweet, getUser) {
  const user = await getUser(tweet.userId);

  const { userId, ...rest } = tweet.toObject ? tweet.toObject() : tweet;

  return {
    tweetId: tweet.tweetId,
    text: tweet.text,
    createdAt: tweet.createdAt,
    user: {
      userId: user.userId,
      username: user.username,
    },
    likesCount: tweet.likesCount || 0,
    dislikesCount: tweet.dislikesCount || 0,
    repostCount: tweet.repostCount || 0,
    commentsCount: tweet.commentsCount || 0,
    ...rest,
  };
}

async function getTimeline(userId) {
  const tweets = await timelineRepository.getAllTweets();

  const getUser = createUserCache();
  const result = [];

  for (const tweet of tweets) {
    if (await isBlocked(userId, tweet.userId)) {
      continue;
    }

    const enriched = await attachUserInfo(tweet, getUser);
    result.push(enriched);
  }

  return {
    message: 'Timeline fetched successfully',
    data: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
}

async function getFollowingTimeline(userId) {
  const followingIds = await followsRepository.getFollowingIds(userId);

  const tweets = await timelineRepository.getTweetsByUserIds(followingIds);

  const getUser = createUserCache();
  const result = [];

  for (const tweet of tweets) {
    if (await isBlocked(userId, tweet.userId)) {
      continue;
    }

    const enriched = await attachUserInfo(tweet, getUser);
    result.push(enriched);
  }

  return {
    message: 'Following timeline fetched successfully',
    data: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
}

async function getLikedTimeline(userId) {
  const likes = await likesRepository.getLikesByUserId(userId);

  const tweetIds = likes.map((l) => l.tweetId);

  const tweets = await timelineRepository.getTweetsByIds(tweetIds);

  const getUser = createUserCache();
  const result = [];

  for (const tweet of tweets) {
    if (await isBlocked(userId, tweet.userId)) {
      continue;
    }

    const enriched = await attachUserInfo(tweet, getUser);
    result.push(enriched);
  }

  return {
    message: result.length
      ? 'Liked timeline fetched successfully'
      : 'No liked tweets found',
    data: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
}

module.exports = {
  getTimeline,
  getFollowingTimeline,
  getLikedTimeline,
};
