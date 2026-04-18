const followsRepository = require('./follows-repository');
const { Users } = require('../../../models');

async function followUser(targetUserId, currentUserId) {
  if (targetUserId === currentUserId) {
    return {
      error: 'VALIDATION',
      message: 'You cannot follow yourself, follow others.',
    };
  }

  const targetUser = await followsRepository.getUserByUserId(targetUserId);

  if (!targetUser) {
    return {
      error: 'NOT_FOUND',
      message: 'User not found',
    };
  }

  const existing = await followsRepository.findFollow(
    currentUserId,
    targetUserId
  );

  if (existing) {
    return {
      error: 'CONFLICT',
      message: 'Already followed this user',
    };
  }

  const follow = await followsRepository.createFollow(
    currentUserId,
    targetUserId
  );

  const followerUser = await followsRepository.getUserByUserId(currentUserId);

  const followingUser = await followsRepository.getUserByUserId(targetUserId);

  return {
    message: 'Followed successfully',
    data: {
      WhoFollow: followerUser.username,
      followerId: currentUserId,
      followWho: followingUser.username,
      followingId: targetUserId,
      followedAt: follow.followedAt,
    },
  };
}

async function unfollowUser(targetUserId, currentUserId) {
  const existing = await followsRepository.findFollow(
    currentUserId,
    targetUserId
  );

  if (!existing) {
    return {
      error: 'NOT_FOUND',
      message: 'Follow relation not found',
    };
  }

  await followsRepository.deleteFollow(currentUserId, targetUserId);

  const followingUser = await followsRepository.getUserByUserId(targetUserId);

  return {
    unfollowWho: followingUser.username,
    message: 'Unfollowed successfully',
  };
}

async function getFollowers(userId) {
  const user = await followsRepository.getUserByUserId(userId);

  if (!user) {
    return {
      error: 'NOT_FOUND',
      message: 'User not found',
    };
  }

  const followers = await followsRepository.getFollowersByUserId(userId);

  const result = await Promise.all(
    followers.map(async (f) => {
      const followerUser = await Users.findOne({
        userId: f.followerId,
      });

      return {
        followerId: f.followerId,
        username: followerUser?.username || null,
        followedAt: f.followedAt,
      };
    })
  );

  return {
    message: result.length ? 'Followers retrieved!' : 'No followers yet',
    count: result.length,
    data: result,
  };
}
module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
};
