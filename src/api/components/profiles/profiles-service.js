const profilesRepository = require('./profiles-repository');

async function getProfile(targetUserId, currentUserId) {
  const user = await profilesRepository.getUserByUserId(targetUserId);

  if (!user) {
    return {
      error: 'NOT_FOUND',
      message: 'User not found',
    };
  }

  // 🔒 BLOCK CHECK
  if (currentUserId) {
    const isBlocked = await profilesRepository.isBlocked(
      currentUserId,
      targetUserId
    );

    const isBlockedByTarget = await profilesRepository.isBlockedByTarget(
      currentUserId,
      targetUserId
    );

    if (isBlocked || isBlockedByTarget) {
      return {
        error: 'FORBIDDEN',
        message:
          'You cannot view this profile, you might either have blocked/get blocked',
      };
    }
  }

  const [
    followersCount,
    followingCount,
    tweetsCount,
    totalLikes,
    totalReposts,
    tweets,
    followStatus,
  ] = await Promise.all([
    profilesRepository.countFollowers(targetUserId),
    profilesRepository.countFollowing(targetUserId),
    profilesRepository.countTweets(targetUserId),
    profilesRepository.countTotalLikes(targetUserId),
    profilesRepository.countTotalReposts(targetUserId),
    profilesRepository.getTweetsByUserId(targetUserId),
    currentUserId
      ? profilesRepository.isFollowing(currentUserId, targetUserId)
      : null,
  ]);

  return {
    message: 'Profile retrieved successfully',
    data: {
      userId: user.userId,
      username: user.username,

      followersCount,
      followingCount,
      tweetsCount,
      totalLikes,
      totalReposts,

      isFollowing: !!followStatus,
      isBlocked: false,

      tweets,
    },
  };
}

module.exports = {
  getProfile,
};
