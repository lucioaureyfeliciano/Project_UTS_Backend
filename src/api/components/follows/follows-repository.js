const { Follows, Users } = require('../../../models');

async function findFollow(followerId, followingId) {
  return Follows.findOne({ followerId, followingId });
}

async function createFollow(followerId, followingId) {
  return Follows.create({
    followerId,
    followingId,
  });
}

async function deleteFollow(followerId, followingId) {
  return Follows.findOneAndDelete({
    followerId,
    followingId,
  });
}

async function getFollowersByUserId(userId) {
  return Follows.find({ followingId: userId });
}

async function getFollowingByUserId(userId) {
  return Follows.find({ followerId: userId }).select('followingId');
}

async function getUserByUserId(userId) {
  return Users.findOne({ userId });
}

module.exports = {
  findFollow,
  createFollow,
  deleteFollow,
  getFollowersByUserId,
  getUserByUserId,
  getFollowingByUserId,
};
