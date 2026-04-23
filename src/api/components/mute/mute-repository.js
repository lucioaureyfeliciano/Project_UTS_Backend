const { Mutes } = require('../../../models');

async function addMute(userId, mutedId) {
  const existing = await Mutes.findOne({ userId, mutedId });

  if (existing) {
    return existing;
  }

  return Mutes.create({ userId, mutedId });
}

async function removeMute(userId, mutedId) {
  return Mutes.deleteOne({ userId, mutedId });
}

async function getMuteListByUserId(userId) {
  return Mutes.find({ userId });
}

async function isMuted(userId, mutedId) {
  return Mutes.findOne({ userId, mutedId });
}

async function countMutedUsersByUserId(userId) {
  return Mutes.countDocuments({ userId });
}

module.exports = {
  addMute,
  removeMute,
  getMuteListByUserId,
  isMuted,
  countMutedUsersByUserId,
};
